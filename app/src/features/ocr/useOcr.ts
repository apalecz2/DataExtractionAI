import { useEffect, useState } from "react";

import { checkOcrWorkerReady, recognizeOcrImage, stopOcrWorker } from "./ocrClient";
import type { OcrProgress, OcrResult } from "./types";

type UseOcrValue = {
    isWorkerReady: boolean;
    isRecognizing: boolean;
    progress: OcrProgress | null;
    selectedFile: File | null;
    previewUrl: string | null;
    result: OcrResult | null;
    error: string | null;
    attachImage: (file: File) => boolean;
    clearImage: () => void;
    runOcr: () => Promise<boolean>;
    resetResult: () => void;
};

const readErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : "OCR failed to initialize.";

export const useOcr = (): UseOcrValue => {
    const [isWorkerReady, setIsWorkerReady] = useState(false);
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [progress, setProgress] = useState<OcrProgress | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [result, setResult] = useState<OcrResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        void checkOcrWorkerReady()
            .then(isReady => {
                if (isMounted) {
                    setIsWorkerReady(isReady);
                }
            })
            .catch((workerError: unknown) => {
                if (isMounted) {
                    setError(readErrorMessage(workerError));
                }
            });

        return () => {
            isMounted = false;
            void stopOcrWorker();
        };
    }, []);

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [selectedFile]);

    const attachImage = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return false;
        }

        setSelectedFile(file);
        setResult(null);
        setError(null);
        setProgress(null);

        return true;
    };

    const clearImage = () => {
        setSelectedFile(null);
        setResult(null);
        setProgress(null);
        setError(null);
    };

    const resetResult = () => {
        setResult(null);
        setProgress(null);
        setError(null);
    };

    const runOcr = async () => {
        if (!selectedFile || isRecognizing || !isWorkerReady) {
            return false;
        }

        setIsRecognizing(true);
        setProgress({
            status: "starting",
            progress: 0,
        });
        setError(null);

        try {
            const nextResult = await recognizeOcrImage(selectedFile, nextProgress => {
                setProgress(nextProgress);
            });

            setResult(nextResult);
            setProgress({
                status: "done",
                progress: 1,
            });

            return true;
        } catch (ocrError) {
            setError(readErrorMessage(ocrError));
            setResult(null);
            return false;
        } finally {
            setIsRecognizing(false);
        }
    };

    return {
        isWorkerReady,
        isRecognizing,
        progress,
        selectedFile,
        previewUrl,
        result,
        error,
        attachImage,
        clearImage,
        runOcr,
        resetResult,
    };
};