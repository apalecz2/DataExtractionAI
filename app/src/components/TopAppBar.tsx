// src/components/TopAppBar.jsx

export default function TopAppBar() {
  return (
    <header className="flex justify-between items-center h-16 px-margin-page bg-surface-bright border-b border-outline-variant z-10 shrink-0">
      {/* Left: Context/Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow"></span>
          <span className="font-mono-data text-mono-data text-on-surface-variant">
            Processing: invoice_772.pdf
          </span>
        </div>
        
        <div className="h-4 w-px bg-outline-variant"></div>
        
        <div className="flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>memory</span>
          <span className="font-mono-data text-mono-data text-[11px] uppercase tracking-wider">
            RAM: 6.2GB / 8.0GB
          </span>
        </div>
      </div>

      {/* Right: Search & Actions */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <span 
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" 
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            search
          </span>
          <input 
            className="pl-9 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-md font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:bg-surface transition-colors w-64" 
            placeholder="Search workspace..." 
            type="text"
          />
        </div>
        
        <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>model_training</span>
        </button>
        
        <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center relative">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-container rounded-full border border-surface"></span>
        </button>
      </div>
    </header>
  );
}