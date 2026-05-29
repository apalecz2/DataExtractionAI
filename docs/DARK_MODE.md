**Dark / Light Mode Implementation (Project Guide)

Overview
--------

This document explains how dark and light mode are implemented in this project so you can reproduce the same behavior in another project. It covers the runtime theme selection, the CSS variable structure, how the Tailwind variants are wired, and the UI toggle implementation.

Key files
- **client/index.html**: bootstraps the theme on page load by reading `localStorage` and the user's system preference.
- **client/src/index.css**: defines CSS variables for colors and the dark variant rules used across the app.
- **client/src/components/Header.tsx**: contains the user-facing theme toggle and writes the choice to `localStorage`.
- **client/vite.config.ts**: includes the Tailwind plugin used in the build pipeline.

How it works (summary)
- On initial page load, a small inline script in `index.html` checks `localStorage.theme` and the `prefers-color-scheme` media query. If the saved preference is `new-dark` or the system prefers dark (and no saved value exists), it adds the `new-dark` class to the document root.
- The stylesheet defines a custom variant that maps the dark mode to the `.new-dark` class. This lets you use Tailwind-style dark variants without toggling the `dark` class on `html` directly.
- Colors are implemented with CSS custom properties (variables). The light mode variables are defined first; the dark values are defined inside a themed block (scoped using the custom variant), overriding the variables when `.new-dark` is present.
- The header toggle flips the `new-dark` class on the document element and persists the selection to `localStorage.theme` so the preference survives page reloads.

Important snippets

- Bootstrapping (from `client/index.html`)

```html
<script>
    (function () {
        const storedTheme = localStorage.theme;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (storedTheme === "new-dark" || (!storedTheme && prefersDark)) {
            document.documentElement.classList.add("new-dark");
        } else {
            document.documentElement.classList.remove("new-dark");
        }
    })();
</script>
```

- CSS variables and variant wiring (from `client/src/index.css`)

```css
@import "tailwindcss";

/* Use toggle, with default as system (index.html has logic for this) */
@custom-variant dark (&:where(.new-dark, .new-dark *));

/* Apply light and dark mode bg colours to entire page */
html,
body {
    @apply bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen;
    font-family: var(--font-main);
}

/* Light mode variables (default) */
@theme {
    --color-bg: #f9fbfb;
    --color-bg-card: #eaf1f0;
    --color-bg-hover: #d5e2e1;
    --color-border: #eaf1f0;
    --color-border-muted: #d5e2e1;
    --color-text: #111818;
    --color-text-muted: #5d8986;
    --color-accent: #36938d;
    --font-main: "Manrope", "Noto Sans", sans-serif;
}

/* Dark mode variables (applies when `.new-dark` is present) */
@layer theme {
    :root,
    :host {
        @variant dark {
            --color-bg: #0f1313;
            --color-bg-card: #1a2322;
            --color-bg-hover: #22302f;
            --color-border: #23302f;
            --color-border-muted: #2a3a39;
            --color-text: #f9fbfb;
            --color-text-muted: #a6c5c3;
            --color-accent: #46b2ab;
        }
    }
}
```

- Toggle logic (from `client/src/components/Header.tsx`)

```ts
const toggleDark = () => {
    const nowDark = !isDark;
    setIsDark(nowDark);
    document.documentElement.classList.toggle("new-dark", nowDark);
    localStorage.theme = nowDark ? "new-dark" : "light";
};
```

Step-by-step: Reuse this pattern in another project
-------------------------------------------------
1. Add the bootstrapping script to your HTML entry (run before any CSS loads):
   - Read `localStorage.theme` and `prefers-color-scheme`.
   - Add or remove a toggle class on `document.documentElement` (here: `new-dark`).

2. Implement CSS variables for theme tokens:
   - Choose canonical variable names (e.g. `--color-bg`, `--color-text`, `--color-accent`).
   - Define defaults for the light theme.
   - Override the variables for dark mode using a selector that targets the toggled class.

3. Wire a custom variant (optional, Tailwind-specific):
   - If you want Tailwind-like `dark:` utilities but with a custom class, create a custom variant that maps `dark` to your class.
   - In this project a directive such as `@custom-variant dark (&:where(.new-dark, .new-dark *));` is used so `@variant`-based rules apply when `.new-dark` is present.

4. Add a toggle UI and persistence:
   - In your React (or plain JS) UI, toggle the class on the `documentElement` when the user flips the theme.
   - Persist the choice in `localStorage.theme` so it survives reloads.

5. Respect system preference by default:
   - If there is no saved preference, prefer the system setting via `window.matchMedia("(prefers-color-scheme: dark)")`.

6. Use the variables everywhere:
   - Replace hardcoded colors with `var(--color-*)` values so switching themes only needs variable overrides.

Accessibility & polish
- Ensure color contrast across both themes is sufficient (WCAG AA/AAA where appropriate).
- Consider adding reduced motion preferences for transitions.
- When toggling, consider animating subtle transitions only (avoid interfering with screen readers).
- Provide accessible labels on the toggle button (e.g. `aria-label="Toggle dark mode"`).

Troubleshooting
- If styles don't flip on load, verify the inline script runs before your CSS and JS bundles.
- If Tailwind utilities don't reflect dark values, ensure the custom variant is supported by your Tailwind/plugin setup and that your build pipeline includes it (see `client/vite.config.ts`).

References
- Header toggle: client/src/components/Header.tsx
- Bootstrap script: client/index.html
- Theme variables and variant: client/src/index.css

Next steps
- Update components to use the CSS variables if any colors are still hard-coded.
- Optionally add an animated transition when switching themes.
