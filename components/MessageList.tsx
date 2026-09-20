"use client";

import { useState, useEffect } from "react";
import MessageCard from "@/components/MessageCard";
import ShareCardModal from "@/components/ShareCardModal";
import { Inbox, Share2, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

interface Message {
  _id: string;
  text: string;
  createdAt: string;
}

interface Props {
  messages: Message[];
  userHandle?: string;
  personalLink?: string;
}

export default function MessageList({ messages, userHandle, personalLink }: Props) {
  const [messageList, setMessageList] = useState<Message[]>(messages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [emptyCopied, setEmptyCopied] = useState(false);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  const handleDelete = async (id: string) => {
    if (deletingIds.has(id)) return;
    setDeletingIds((prev) => new Set(prev).add(id));

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });

      if (response.ok || response.status === 404) {
        setMessageList((prev) => prev.filter((msg) => msg._id !== id));
        toast.success("Message deleted");
      } else {
        let errorMessage = "Failed to delete message";
        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch {}
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Check your internet connection.");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleCopyEmptyLink = async () => {
    if (!personalLink) return;
    try {
      await navigator.clipboard.writeText(personalLink);
      setEmptyCopied(true);
      toast.success("Personal link copied!");
      setTimeout(() => setEmptyCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Inbox size={20} className="text-primary" />
          Your Whispers
        </h2>
        <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground shadow-sm">
          {messageList.length}{" "}
          {messageList.length === 1 ? "Message" : "Messages"}
        </span>
      </div>

      {messageList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-muted/20 p-8 sm:py-16 text-center transition-all">
          <div className="mb-4 rounded-full border border-border bg-background p-4 shadow-sm">
            <Inbox size={32} className="text-muted-foreground/50" />
          </div>
          <p className="font-semibold text-foreground text-base">No whispers yet</p>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-xs">
            Share your link with friends or on social media to start receiving anonymous messages!
          </p>

          {personalLink && (
            <button
              onClick={handleCopyEmptyLink}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold rounded-full hover:opacity-90 active:scale-95 transition shadow-sm"
            >
              {emptyCopied ? <Check size={14} /> : <Share2 size={14} />}
              <span>{emptyCopied ? "Link Copied!" : "Copy Your Link"}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {messageList.map((msg) => (
              <MessageCard
                key={msg._id}
                id={msg._id}
                text={msg.text}
                createdAt={msg.createdAt}
                onDelete={handleDelete}
                isDeleting={deletingIds.has(msg._id)}
                onSelect={(id) => {
                  const targetMsg = messageList.find((m) => m._id === id);
                  if (targetMsg) setSelectedMessage(targetMsg);
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        message={selectedMessage}
        userHandle={userHandle}
        personalLink={personalLink}
      />
    </div>
  );
}
