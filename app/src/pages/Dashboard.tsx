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
    <main className="flex-1 p-margin-page flex flex-col items-center justify-center bg-surface relative overflow-hidden h-full">
      {/* Atmospheric background element */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
      
      <div className="max-w-2xl w-full flex flex-col items-center text-center z-10">
        <h2 className="font-display-lg text-display-lg text-primary mb-4 tracking-tight">
          Extract Intelligence.
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-lg">
          Drop your documents here. Artifact will analyze and extract structured data locally, ensuring complete privacy.
        </p>

        {/* Drag & Drop Zone */}
        <div 
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full border border-dashed rounded-xl p-16 flex flex-col items-center justify-center cursor-pointer mb-8 relative group transition-all duration-300
            ${isDragging 
              ? 'bg-surface-container-high border-primary' 
              : 'bg-surface-bright border-outline-variant hover:bg-surface-container-low'
            }`}
        >
          <input 
            accept=".pdf,.png,.jpg,.jpeg" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            multiple 
            type="file"
            onChange={handleFileInput}
          />
          
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <span 
              className="material-symbols-outlined text-primary" 
              style={{ fontSize: '32px', fontVariationSettings: "'wght' 300" }}
            >
              upload_file
            </span>
          </div>
          
          <h3 className="font-headline-md text-headline-md text-primary mb-2">
            Select files to upload
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            or drag and drop them here
          </p>
        </div>

        {/* Supported File Types */}
        <div className="flex items-center gap-6 text-on-surface-variant font-label-md text-label-md">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>picture_as_pdf</span>
            PDF
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>image</span>
            PNG
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>image</span>
            JPEG
          </span>
        </div>
      </div>
    </main>
  );
}