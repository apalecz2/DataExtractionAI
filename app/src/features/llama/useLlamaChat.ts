import { useContext } from "react";

import { LlamaChatContext } from "./LlamaChatContext";

export const useLlamaChat = () => {
    const context = useContext(LlamaChatContext);

    if (!context) {
        throw new Error("useLlamaChat must be used within a LlamaChatProvider.");
    }

    return context;
};
