type SideNavBarProps = {
    collapsed: boolean;
    onToggleCollapse: () => void;
};

const sidebarItems = [
    { id: 'search-chats', label: 'Search Chats', icon: 'search' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'about', label: 'About', icon: 'info' },
];

export default function SideNavBar({ collapsed, onToggleCollapse }: SideNavBarProps) {
    const textVisibilityClasses = collapsed ? 'pointer-events-none w-0 opacity-0' : 'w-auto opacity-100';

    return (
        <nav
            aria-label="Sidebar"
            className="fixed left-0 top-0 z-20 flex h-screen flex-col border-r border-outline-variant bg-background shadow-lg shadow-black/10 transition-[background-color,border-color,box-shadow,width] duration-150 lg:shadow-none"
            style={{
                width: collapsed ? '5.5rem' : '18rem',
                paddingTop: 'var(--app-install-banner-height, 0px)',
                paddingBottom: 'var(--dev-dashboard-height, 0px)',
            }}
        >
            <div className="relative flex w-full items-center p-2 pointer-events-auto pt-2">
                <div className="flex items-center gap-1.5 pl-2 h-8 overflow-clip [overflow-clip-margin:4px] transition-opacity duration-150 opacity-100">
                    <div className={`min-w-0 overflow-hidden transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
                        <h1 className="truncate font-headline-md text-headline-md leading-none text-on-surface">
                            Artifact
                        </h1>
                    </div>
                </div>

                <div className="absolute right-3 top-2 flex items-center gap-1 transition-[right] duration-150">
                    {!collapsed && (
                        <button
                            aria-label="Search"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                                search
                            </span>
                        </button>
                    )}
                    <button
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                        onClick={onToggleCollapse}
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                            {collapsed ? 'chevron_right' : 'chevron_left'}
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col grow overflow-hidden min-h-0 opacity-100 transition-opacity ease-out duration-150" aria-hidden={collapsed ? 'true' : 'false'}>
                <div className="flex flex-col gap-px pt-2">
                    <div className="px-2">
                        <button
                            className="inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-[9px] border border-transparent bg-primary px-4 py-2.5 text-xs font-medium text-on-primary transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                            type="button"
                        >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-on-primary/15 text-on-primary">
                                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    add
                                </span>
                            </span>
                            <span className={`flex-1 truncate text-left font-body-sm text-body-sm ${textVisibilityClasses}`}>
                                New Extraction
                            </span>
                        </button>
                    </div>
                </div>

                <div className="flex grow flex-col overflow-x-hidden overflow-y-auto border-t border-transparent scrollbar-gutter-stable pt-2">
                    <div className="flex flex-col px-2 gap-px">
                        {sidebarItems.map((item) => (
                            <button
                                aria-label={item.label}
                                className="group inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-[9px] border border-transparent px-4 py-2.5 text-xs font-medium text-on-surface-variant transition duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] hover:bg-surface-container-high hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                key={item.id}
                                title={item.label}
                                type="button"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center text-on-surface-variant transition-colors group-hover:text-primary">
                                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                                        {item.icon}
                                    </span>
                                </span>
                                <span className={`flex-1 truncate text-left font-body-sm text-body-sm transition-opacity duration-150 ${textVisibilityClasses}`}>
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="px-2 mt-4">
                        <div className="flex flex-col grow">
                            <div className="group/nsh flex items-center gap-1 min-w-0 mt-1 pb-2 pl-2 text-xs text-on-surface-variant select-none">
                                <h2 className="contents">
                                    <span className={`truncate ${textVisibilityClasses}`}>
                                        Recents
                                    </span>
                                </h2>
                            </div>

                            <div className="relative group">
                                <button
                                    className="inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-[9px] border border-transparent px-4 py-2.5 text-xs font-medium text-on-surface-variant transition duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] hover:bg-surface-container-high hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                    type="button"
                                >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-on-surface-variant transition-colors group-hover:text-primary">
                                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                                            history
                                        </span>
                                    </span>
                                    <span className={`flex-1 truncate text-left font-body-sm text-body-sm transition-opacity duration-150 ${textVisibilityClasses}`}>
                                        Recent extraction
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 border-t border-outline-variant/50 p-2">
                    <button
                        aria-label="Local Session settings"
                        className="inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-none border border-transparent px-2 py-4 text-sm font-medium transition-[gap] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                        type="button"
                    >
                        <div className="relative shrink-0">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-on-surface text-background text-[16px] font-bold select-none">
                                A
                            </div>
                        </div>
                        <div className={`flex flex-1 min-w-0 flex-col items-start pr-1 transition-opacity duration-150 ${textVisibilityClasses}`}>
                            <span className="w-full truncate text-start font-label-md text-label-md text-on-surface">Local Session</span>
                            <span className="w-full truncate text-start font-body-sm text-body-sm text-on-surface-variant">Private and offline</span>
                        </div>
                        <span className={`ml-auto flex items-center text-on-surface-variant transition-opacity duration-150 ${textVisibilityClasses}`}>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                                settings
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}