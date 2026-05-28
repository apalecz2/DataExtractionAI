import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LlamaChatProvider } from "./features/llama/LlamaChatContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LlamaChatProvider>
      <App />
    </LlamaChatProvider>
  </React.StrictMode>,
);
