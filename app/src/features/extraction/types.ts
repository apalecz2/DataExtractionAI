export type FileAttachment = {
    name: string;
    type: string;
    data: string;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
    id: number;
    role: ChatRole;
    content: string;
    isStreaming?: boolean;
    attachments?: FileAttachment[];
};
