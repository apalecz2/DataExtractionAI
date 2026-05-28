import { useEffect, useRef, useState } from "react";
import "./App.css";

import { useLlamaChat } from "./features/llama/useLlamaChat";

function App() {
    const [input, setInput] = useState("");

    const {
        isServerReady,
        isLoading,
        messages,
        pendingAttachment,
        attachImage,
        removePendingAttachment,
        sendMessage,
    } = useLlamaChat();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        void attachImage(file).finally(() => {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        });
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        const wasSent = await sendMessage(input);

        if (wasSent) {
            setInput("");
        }
    };

    return (
        <main className="flex flex-col h-screen max-h-screen bg-gray-50 p-4 font-sans text-gray-900">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4 tracking-tight">Local Data Extraction AI</h1>

            {!isServerReady ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-6"></div>
                    <h2 className="text-xl font-semibold text-gray-800">Loading Inference Engine</h2>
                    <p className="text-gray-500 text-sm mt-3 max-w-sm text-center leading-relaxed">
                        Starting local model backend. This may take a moment.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-2 text-center text-sm">
                        <span className="px-4 py-1.5 rounded-full text-green-700 bg-green-100 font-medium border border-green-200 shadow-sm">
                            Backend Ready
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-col gap-4 border border-gray-200">
                        {messages.length === 0 && (
                            <div className="text-gray-400 text-center mt-auto mb-auto">
                                <p>Attach an image and ask a question to extract data.</p>
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div key={msg.id} className={`p-4 rounded-2xl max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600 text-white self-end rounded-br-sm shadow-md' : 'bg-gray-100 text-gray-800 self-start rounded-bl-sm shadow-sm border border-gray-200'}`}>

                                {msg.attachments && msg.attachments.length > 0 && (
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {msg.attachments.map((att, i) => (
                                            <div key={i} className={`text-xs px-3 py-1.5 rounded flex items-center gap-2 ${msg.role === 'user' ? 'bg-white/20' : 'bg-white border border-gray-300'}`}>
                                                <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                <span className="truncate max-w-37.5 font-medium">{att.name}</span>
                                                <span className="text-[10px] uppercase opacity-75 ml-1">IMAGE</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {msg.content ? (
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                ) : msg.isStreaming ? (
                                    <p className="whitespace-pre-wrap leading-relaxed text-gray-500">Thinking...</p>
                                ) : null}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="flex flex-col gap-2 relative" onSubmit={handleSend}>

                        {pendingAttachment && (
                            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg absolute bottom-[110%] left-0 right-0 shadow-sm transition-all">
                                <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium text-gray-800 truncate">{pendingAttachment.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{pendingAttachment.type || 'Unknown type'}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={removePendingAttachment}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        )}

                        <div className="flex gap-2 items-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading}
                                className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors disabled:opacity-50 border border-transparent"
                                title="Attach Image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                            </button>

                            <input
                                className="flex-1 p-3.5 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all bg-white"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about the attached image..."
                                disabled={isLoading}
                            />

                            <button
                                className="px-6 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium shadow-sm transition-all"
                                type="submit"
                                disabled={isLoading || (!input.trim() && !pendingAttachment)}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </>
            )}
        </main>
    );
}

export default App;
