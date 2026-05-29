import React, { useState } from 'react';

export default function Dashboard(): React.ReactElement {
  const [isDragging, setIsDragging] = useState(false);

  // Drag and Drop Handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files: FileList = e.dataTransfer.files;
    console.log('Files dropped:', files);
    // TODO: Route to the extraction workspace with these files
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList | null;
    console.log('Files selected:', files);
    // TODO: Route to the extraction workspace with these files
  };

  return (
    <main className="relative h-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08),_transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

      <div className="relative flex h-full flex-col gap-8 px-margin-page py-10">
        <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-low px-4 py-2 font-label-md text-label-md text-on-surface-variant shadow-sm shadow-black/5">
              <span className="material-symbols-outlined text-[18px] text-primary">bolt</span>
              Local-first extraction workspace
            </div>

            <div className="space-y-4">
              <h2 className="font-display-lg text-display-lg text-primary tracking-tight">
                A calm place to extract structure from documents.
              </h2>
              <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
                Upload PDFs or images, keep everything on-device, and move from raw files to reviewable output without losing context.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Offline by design', 'No cloud dependency'],
                ['Traceable output', 'Review before export'],
                ['Flexible inputs', 'PDF, PNG, JPEG'],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-3xl border border-outline-variant bg-surface-bright p-4 shadow-sm shadow-black/5">
                  <p className="font-label-md text-label-md text-primary">{title}</p>
                  <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-2xl flex-1 rounded-[2rem] border border-outline-variant bg-surface-bright p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] shadow-black/10">
            <div
              className={`group relative overflow-hidden rounded-[1.75rem] border border-dashed p-6 transition-all duration-300 ${
                isDragging
                  ? 'border-primary bg-surface-container-high'
                  : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.06),_transparent_60%)] opacity-70" />

              <input
                accept=".pdf,.png,.jpg,.jpeg"
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                multiple
                type="file"
                onChange={handleFileInput}
              />

              <div className="relative z-0 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-container-high text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <span
                      className="material-symbols-outlined text-[28px]"
                      style={{ fontVariationSettings: "'wght' 300" }}
                    >
                      upload_file
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-headline-md text-headline-md text-primary">
                      Drop files to begin, or browse from your machine.
                    </h3>
                    <p className="mt-2 max-w-md font-body-md text-body-md text-on-surface-variant">
                      The app stays local while it analyzes layout, text, and tables for structured extraction.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-outline-variant bg-surface-bright px-4 py-3 shadow-sm shadow-black/5">
                  <div className="flex flex-wrap items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-primary">search</span>
                    <span className="font-body-md text-body-md">Search chats, uploaded files, or extraction history</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['PDF tables', 'Receipts', 'Scans', 'Handwriting'].map((label) => (
                    <span
                      className="rounded-full border border-outline-variant bg-surface-container-low px-3 py-2 font-label-md text-label-md text-on-surface-variant"
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-outline-variant bg-surface-container-low px-4 py-4">
                  <div>
                    <p className="font-label-md text-label-md text-primary">Ready when you are</p>
                    <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                      Drop a file or start from an existing chat.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="rounded-full border border-outline-variant bg-surface-bright px-4 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container" type="button">
                      Browse files
                    </button>
                    <button className="rounded-full bg-primary px-4 py-2 font-label-md text-label-md text-on-primary transition-transform hover:-translate-y-0.5" type="button">
                      Start extraction
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ['Recent chat', 'Invoice batch review'],
                ['Queued locally', '6 files waiting'],
                ['About this build', 'Private, local-first UI'],
              ].map(([label, detail]) => (
                <div key={label} className="rounded-3xl border border-outline-variant bg-surface-container-low p-4">
                  <p className="font-label-md text-label-md text-on-surface-variant">{label}</p>
                  <p className="mt-2 font-body-md text-body-md text-primary">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}