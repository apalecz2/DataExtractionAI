import { createWorker } from "tesseract.js";

import type { OcrProgress, OcrResult, OcrWord } from "./types";

const OCR_WORKER_PATH = "/tesseract/worker.min.js";
const OCR_CORE_PATH = "/tesseract/";
const OCR_LANG_PATH = "/tesseract/";

type TesseractWorker = Awaited<ReturnType<typeof createWorker>>;
type LoggerMessage = {
    status?: string;
    progress?: number;
};

let workerPromise: Promise<TesseractWorker> | null = null;
let progressListener: ((progress: OcrProgress) => void) | null = null;

const parseConfidence = (value: string | number | undefined) => {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
    }

    if (typeof value !== "string") {
        return 0;
    }

    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const parseInteger = (value: string | undefined) => {
    const parsed = Number.parseInt(value ?? "0", 10);
    return Number.isFinite(parsed) ? parsed : 0;
};

const parseTsv = (tsv: string): OcrWord[] => {
    const lines = tsv.trim().split(/\r?\n/);

    if (lines.length <= 1) {
        return [];
    }

    return lines.slice(1).flatMap((line) => {
        const parts = line.split("\t");

        if (parts.length < 12) {
            return [];
        }

        const text = (parts[11] ?? "").trim();
        const level = parseInteger(parts[0]);

        if (level !== 5 || !text) {
            return [];
        }

        return [
            {
                text,
                confidence: parseConfidence(parts[10]),
                box: {
                    left: parseInteger(parts[6]),
                    top: parseInteger(parts[7]),
                    width: parseInteger(parts[8]),
                    height: parseInteger(parts[9]),
                },
                pageNumber: parseInteger(parts[1]),
                blockNumber: parseInteger(parts[2]),
                paragraphNumber: parseInteger(parts[3]),
                lineNumber: parseInteger(parts[4]),
                wordNumber: parseInteger(parts[5]),
            },
        ];
    });
};

const createOcrWorker = () =>
    createWorker("eng", 1, {
        workerPath: OCR_WORKER_PATH,
        corePath: OCR_CORE_PATH,
        langPath: OCR_LANG_PATH,
        gzip: false,
        logger: (message: LoggerMessage) => {
            if (!message.status) {
                return;
            }

            progressListener?.({
                status: message.status,
                progress: typeof message.progress === "number" ? message.progress : 0,
            });
        },
        errorHandler: error => {
            console.error("OCR worker initialization error:", error);
        },
    });

const ensureWorker = async () => {
    if (!workerPromise) {
        workerPromise = createOcrWorker()
            .then(async worker => {
                await worker.setParameters({
                    preserve_interword_spaces: "1",
                });

                return worker;
            })
            .catch(error => {
                workerPromise = null;
                throw error;
            });
    }

    return workerPromise;
};

export const recognizeOcrImage = async (
    image: File | string,
    onProgress?: (progress: OcrProgress) => void,
): Promise<OcrResult> => {
    progressListener = onProgress ?? null;

    try {
        const worker = await ensureWorker();

        onProgress?.({
            status: "processing",
            progress: 0,
        });

        const { data } = await worker.recognize(
            image,
            {},
            {
                text: true,
                tsv: true,
            },
        );

        const text = typeof data.text === "string" ? data.text.trim() : "";
        const words = typeof data.tsv === "string" ? parseTsv(data.tsv) : [];
        const meanConfidence = words.length > 0
            ? words.reduce((sum, word) => sum + word.confidence, 0) / words.length
            : 0;

        return {
            text,
            words,
            meanConfidence,
        };
    } finally {
        progressListener = null;
    }
};

export const stopOcrWorker = async () => {
    if (!workerPromise) {
        return;
    }

    const worker = await workerPromise;
    workerPromise = null;
    await worker.terminate();
};

export const checkOcrWorkerReady = async () => {
    try {
        await ensureWorker();
        return true;
    } catch (error) {
        console.error("Failed to initialize OCR worker:", error);
        return false;
    }
};