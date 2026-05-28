import { useRef, useState, type ChangeEvent, type SyntheticEvent } from "react";

import { useOcr } from "./useOcr";

const formatConfidence = (value: number) => `${value.toFixed(1)}%`;

export const OcrWorkspace = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const {
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
    } = useOcr();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const accepted = attachImage(file);

        if (accepted) {
            setImageSize({ width: 0, height: 0 });
            resetResult();
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
        setImageSize({
            width: event.currentTarget.naturalWidth,
            height: event.currentTarget.naturalHeight,
        });
    };

    return (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">WASM OCR</p>
                            <h2 className="mt-1 text-xl font-semibold text-slate-900">Tesseract.js in the browser</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                            >
                                Choose image
                            </button>

                            <button
                                type="button"
                                onClick={() => void runOcr()}
                                disabled={!selectedFile || isRecognizing || !isWorkerReady}
                                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isRecognizing ? "Recognizing..." : "Run OCR"}
                            </button>

                            <button
                                type="button"
                                onClick={clearImage}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${isWorkerReady ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                            {isWorkerReady ? "Worker ready" : "Starting worker"}
                        </span>

                        {selectedFile ? (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                {selectedFile.name}
                            </span>
                        ) : null}

                        {progress ? (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                {progress.status} · {Math.round(progress.progress * 100)}%
                            </span>
                        ) : null}

                        {error ? (
                            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                                {error}
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="pt-4">
                    {previewUrl ? (
                        <div
                            className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/5"
                            style={{
                                aspectRatio: imageSize.width > 0 && imageSize.height > 0
                                    ? `${imageSize.width} / ${imageSize.height}`
                                    : "4 / 3",
                            }}
                        >
                            <img
                                src={previewUrl}
                                alt="Selected document preview"
                                onLoad={handleImageLoad}
                                className="absolute inset-0 h-full w-full object-contain"
                            />

                            {result?.words.map((word, index) => (
                                <div
                                    key={`${word.pageNumber}-${word.lineNumber}-${word.wordNumber}-${index}`}
                                    className="absolute rounded-sm border border-amber-300/80 bg-amber-400/20"
                                    title={`${word.text} (${word.confidence.toFixed(1)})`}
                                    style={{
                                        left: `${(word.box.left / Math.max(imageSize.width, 1)) * 100}%`,
                                        top: `${(word.box.top / Math.max(imageSize.height, 1)) * 100}%`,
                                        width: `${(word.box.width / Math.max(imageSize.width, 1)) * 100}%`,
                                        height: `${(word.box.height / Math.max(imageSize.height, 1)) * 100}%`,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-96 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center text-sm text-slate-500">
                            Choose an image to preview OCR boxes and extracted text.
                        </div>
                    )}
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recognition output</p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">Text and word metadata</h3>
                    </div>

                    {result ? (
                        <div className="text-right text-xs text-slate-500">
                            <p>{result.words.length} words</p>
                            <p>Mean confidence {formatConfidence(result.meanConfidence)}</p>
                        </div>
                    ) : null}
                </div>

                <div className="mt-4 space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Extracted text</p>
                        {result?.text ? (
                            <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-800">{result.text}</pre>
                        ) : (
                            <p className="text-sm text-slate-500">
                                Run OCR to see the extracted text here.
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-slate-200">
                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Word boxes</p>
                        </div>

                        <div className="max-h-112 overflow-y-auto">
                            {result?.words.length ? (
                                <table className="min-w-full divide-y divide-slate-200 text-sm">
                                    <thead className="sticky top-0 bg-white">
                                        <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
                                            <th className="px-4 py-3 font-medium">Word</th>
                                            <th className="px-4 py-3 font-medium">Confidence</th>
                                            <th className="px-4 py-3 font-medium">Box</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {result.words.map((word) => (
                                            <tr key={`${word.pageNumber}-${word.lineNumber}-${word.wordNumber}-${word.text}`} className="align-top">
                                                <td className="px-4 py-3 text-slate-800">{word.text}</td>
                                                <td className="px-4 py-3 text-slate-600">{word.confidence.toFixed(1)}</td>
                                                <td className="px-4 py-3 text-xs text-slate-500">
                                                    {word.box.left}, {word.box.top}, {word.box.width}, {word.box.height}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="px-4 py-6 text-sm text-slate-500">
                                    OCR word boxes will appear here after recognition.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};