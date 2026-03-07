"use client";

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion"; // No AnimatePresence here

interface MessageCardProps {
  id: string;
  text: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function MessageCard({ id, text, createdAt, onDelete }: MessageCardProps) {
  return (
    <motion.div
      layout // Smoothly repositions other cards when one is deleted
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-card p-4 rounded-xl border border-border shadow-sm flex justify-between items-start gap-3"
    >
      <div className="min-w-0">
        <p className="break-words">{text}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => onDelete(id)} 
        className="shrink-0 text-destructive hover:bg-destructive/10 p-2 rounded-lg transition"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}