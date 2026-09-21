"use client";

import { Trash2, Share2, Loader2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { usePostHog } from "@posthog/react";

function formatMessageDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const timeStr = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isToday) {
    return `Today at ${timeStr}`;
  }

  if (isYesterday) {
    return `Yesterday at ${timeStr}`;
  }

  const isThisYear = date.getFullYear() === now.getFullYear();
  const dateFormatted = date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    ...(isThisYear ? {} : { year: "numeric" }),
  });

  return `${dateFormatted} • ${timeStr}`;
}

interface MessageCardProps {
  id: string;
  text: string;
  createdAt: string;
  onDelete: (id: string) => void;
  onSelect?: (id: string) => void;
  isDeleting?: boolean;
}

export default function MessageCard({
  id,
  text,
  createdAt,
  onDelete,
  onSelect,
  isDeleting = false,
}: MessageCardProps) {
  const posthog = usePostHog();

  const handleOpenShare = () => {
    if (isDeleting) return;
    posthog?.capture("share_card_opened", {
      message_length: text.length,
    });
    onSelect?.(id);
  };

  const handleDelete = () => {
    if (isDeleting) return;
    posthog?.capture("message_deleted");
    onDelete(id);
  };

  return (
    <motion.div
      layout // Smoothly repositions other cards when one is deleted
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isDeleting ? 0.45 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={handleOpenShare}
      className={`group bg-card p-4 rounded-xl border border-border shadow-sm flex justify-between items-start gap-3 transition-all relative ${
        isDeleting
          ? "pointer-events-none opacity-50 cursor-not-allowed border-destructive/30"
          : "cursor-pointer hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="break-words whitespace-pre-wrap text-foreground group-hover:text-foreground transition-colors">
          {text}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5">
          <p
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium"
            title={new Date(createdAt).toLocaleString(undefined, { dateStyle: "full", timeStyle: "medium" })}
            suppressHydrationWarning
          >
            <Clock size={12} className="text-muted-foreground/70 shrink-0" />
            <span>{formatMessageDate(createdAt)}</span>
          </p>
          {isDeleting ? (
            <span className="text-xs text-destructive font-medium flex items-center gap-1 animate-pulse">
              Deleting...
            </span>
          ) : (
            <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <Share2 size={11} /> Click to share card
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenShare();
          }}
          disabled={isDeleting}
          className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition disabled:opacity-40"
          title="Share as image card"
          aria-label="Share as image card"
        >
          <Share2 size={16} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          disabled={isDeleting}
          className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition disabled:opacity-40"
          title={isDeleting ? "Deleting whisper..." : "Delete whisper"}
          aria-label={isDeleting ? "Deleting whisper..." : "Delete whisper"}
        >
          {isDeleting ? (
            <Loader2 size={16} className="animate-spin text-destructive" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>
    </motion.div>
  );
}