"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast"; // Assuming you use sonner for notifications

export default function SendMessageForm({ recipientId }: { recipientId: string }) {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientId, text }),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast.success("Message sent anonymously!");
      setText(""); // Clear form
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your anonymous message here..."
          className="w-full min-h-[150px] p-4 rounded-2xl border border-border bg-card resize-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          maxLength={500}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {text.length}/500
        </div>
      </div>

      <button
        type="submit"
        disabled={isSending || !text.trim()}
        className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
      >
        {isSending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Send Whisper <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}