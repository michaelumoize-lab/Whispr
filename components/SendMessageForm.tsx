"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function SendMessageForm({
  recipientId,
}: {
  recipientId: string;
}) {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (typeof CSS !== "undefined" && CSS.supports && CSS.supports("field-sizing", "content")) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 150)}px`;
  }, [text]);

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

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      toast.success("Message sent anonymously!");
      setText("");
      setIsSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isSending && text.trim()) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-300 shadow-xl text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <CheckCircle2 size={32} />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-foreground">Whisper Delivered!</h2>
          <p className="text-sm text-muted-foreground">
            Your secret message was sent completely anonymously.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full py-3 px-4 rounded-full border border-border bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-muted active:scale-95 transition flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} /> Send Another Whisper
          </button>

          <Link
            href="/sign-up"
            className="w-full py-3 px-4 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 active:scale-95 transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Sparkles size={16} /> Create Your Own Whispr Link
          </Link>
        </div>
      </div>
    );
  }

  const charCount = text.length;
  const counterColorClass =
    charCount >= 480
      ? "text-destructive font-bold"
      : charCount >= 400
      ? "text-amber-500 font-medium"
      : "text-muted-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your anonymous message here..."
          className="w-full min-h-[150px] p-4 pb-8 rounded-2xl border border-border bg-card resize-none overflow-hidden [field-sizing:content] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-[border-color,box-shadow]"
          maxLength={500}
        />
        <div
          className={`absolute bottom-3 right-3 text-xs pointer-events-none select-none transition-colors ${counterColorClass}`}
        >
          {charCount}/500
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
