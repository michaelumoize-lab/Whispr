"use client";

import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface MessageCardProps {
  id: string;
  text: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function MessageCard({
  id,
  text,
  createdAt,
  onDelete,
}: MessageCardProps) {
  const handleDelete = async () => {
    const res = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      onDelete(id);
      toast.success("Message deleted");
    } else {
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex justify-between items-start">
      <div>
        <p>{text}</p>

        <p className="text-xs text-muted-foreground mt-1">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
