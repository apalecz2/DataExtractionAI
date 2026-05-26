# Local Data Extraction App

This folder contains the main application for the Local Data Extraction AI project. Built using React, TypeScript, and Tauri, it is designed for private, offline data extraction from documents and images.

## Structure

*   `src/`: React frontend UI.
*   `src-tauri/`: Rust backend, handling system threads, OCR integrations, and local LLM execution.
*   `src-tauri/binaries/`: Platform-organized llama.cpp binaries for packaging.

## Binary Layout

Keep platform-specific executables under a matching folder, for example:

*   `src-tauri/binaries/windows/`
*   `src-tauri/binaries/macos/`
*   `src-tauri/binaries/linux/`

The build script prefers the platform folder when present and falls back to the legacy top-level `binaries/` files so the repo can migrate gradually.

## Getting Started

1.  Make sure you have Node.js and Rust installed globally.
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Run the application in development mode:
    ```bash
    npm run tauri dev
    ```
4. Other dependencies (follow steps based on platform):
    https://v2.tauri.app/start/prerequisites/

## Multi-platform Builds

Use one release build per operating system. For example:

*   Windows package built on Windows with Windows llama.cpp binaries.
*   macOS package built on macOS with macOS llama.cpp binaries.

The app code selects the correct llama server resource path at runtime, while Tauri bundles the corresponding platform folder during packaging.

## Development Commands

*   `npm run build`: Build the React frontend.
*   `npm run tauri build`: Compile the full release application (frontend + Rust backend) into native installers.
 