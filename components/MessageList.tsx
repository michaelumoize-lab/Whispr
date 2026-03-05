"use client";

import { useState, useEffect } from "react";
import MessageCard from "@/components/MessageCard";
import { Inbox } from "lucide-react";

// Ensure this matches the SerializedMessage interface from your Dashboard
interface Message {
  _id: string;
  text: string;
  createdAt: string;
}

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  // 1. Initialize state with server-provided messages
  const [messageList, setMessageList] = useState<Message[]>(messages);

  // 2. Sync internal state when server-side props change (Crucial for the Sync button)
  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  const handleDelete = (id: string) => {
    // Optimistic UI update
    setMessageList((prev) => prev.filter((msg) => msg._id !== id));
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Inbox size={20} className="text-primary" />
          Your Whispers
        </h2>
        <span className="text-xs font-medium bg-secondary px-3 py-1 rounded-full text-secondary-foreground shadow-sm">
          {messageList.length} {messageList.length === 1 ? "Message" : "Messages"}
        </span>
      </div>

      {messageList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-3xl bg-muted/20 transition-all">
          <div className="bg-background p-4 rounded-full shadow-sm mb-4 border border-border">
            <Inbox size={32} className="text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground font-medium">No messages yet 😶</p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Share your link to start receiving whispers!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messageList.map((msg) => (
            <div 
              key={msg._id} 
              className="transition-all duration-300 ease-in-out"
            >
              <MessageCard
                id={msg._id}
                text={msg.text}
                createdAt={msg.createdAt}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}