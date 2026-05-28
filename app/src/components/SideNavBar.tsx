// src/components/SideNavBar.jsx
import { NavLink } from 'react-router';

export default function SideNavBar() {
  // Helper function to handle active/inactive Tailwind classes
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
      isActive
        ? 'text-primary font-bold bg-surface-container border-r-2 border-primary'
        : 'text-on-surface-variant hover:bg-surface-container-high font-normal'
    }`;

  return (
    <nav className="fixed left-0 top-0 h-full flex flex-col p-unit w-70 rounded-lg bg-surface border-r border-outline-variant z-20">
      {/* Header */}
      <div className="p-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-headline-md">
            A
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md text-primary leading-none">
              Artifact
            </h1>
            <span className="font-label-md text-label-md text-on-surface-variant font-normal tracking-normal text-[11px] uppercase">
              Local Intelligence
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 flex flex-col gap-1">
        <NavLink to="/workspace" className={navLinkClasses}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>description</span>
          <span className="font-body-md text-body-md">Documents</span>
        </NavLink>
        
        <NavLink to="/queue" className={navLinkClasses}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>pending_actions</span>
          <span className="font-body-md text-body-md">Queue</span>
        </NavLink>
        
        <NavLink to="/history" className={navLinkClasses}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>history</span>
          <span className="font-body-md text-body-md">History</span>
        </NavLink>
        
        {/* Push settings to the bottom */}
        <div className="mt-auto">
          <NavLink to="/settings" className={navLinkClasses}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
            <span className="font-body-md text-body-md">Settings</span>
          </NavLink>
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 mt-2">
        <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-inverse-surface transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>add</span>
          New Extraction
        </button>
      </div>
    </nav>
  );
}