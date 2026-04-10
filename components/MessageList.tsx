"use client";

import { useState, useEffect, useRef } from "react";
import MessageCard from "@/components/MessageCard";
import { Inbox } from "lucide-react";
import { toast } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

interface Message {
  _id: string;
  text: string;
  createdAt: string;
}

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const [messageList, setMessageList] = useState<Message[]>(messages);
  // Track IDs currently being deleted to prevent double-firing
  const deletingIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

 const handleDelete = async (id: string) => {
  if (deletingIds.current.has(id)) return;
  deletingIds.current.add(id);

  const originalList = [...messageList];
  // Optimistic UI update
  setMessageList((prev) => prev.filter((msg) => msg._id !== id));

  try {
    const response = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Message deleted");
    } else if (response.status === 404) {
      // If 404, it's already gone from DB, so we stay optimistic
      toast.success("Message deleted");
    } else {
      // Something actually went wrong (400, 403, 500, etc.)
      setMessageList(originalList);
      
      let errorMessage = "Failed to delete";
      try {
        // Only try to parse JSON if there's actually a body
        const data = await response.json();
        errorMessage = data.error || errorMessage;
      } catch {
        // If JSON parsing fails, we just fall back to the default errorMessage
      }
      
      toast.error(errorMessage);
    }
  } catch (error) {
    console.error("Delete error:", error);
    setMessageList(originalList);
    toast.error("Check your internet connection.");
  } finally {
    deletingIds.current.delete(id);
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
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-muted/20 py-20 transition-all">
          <div className="mb-4 rounded-full border border-border bg-background p-4 shadow-sm">
            <Inbox size={32} className="text-muted-foreground/50" />
          </div>
          <p className="font-medium text-muted-foreground">No messages yet.</p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Share your link to start receiving whispers!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
          {messageList.map((msg) => (
            <div
              key={msg._id}
              className="transition-all duration-300 ease-in-out"
            >
              <MessageCard
                key={msg._id}
                id={msg._id}
                text={msg.text}
                createdAt={msg.createdAt}
                onDelete={handleDelete}
              />
            </div>
          ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
