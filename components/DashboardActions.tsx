"use client";

import { RefreshCw, Share2, Check } from "lucide-react";
import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DashboardActions({ link }: { link: string }) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  
  // Track if this is the first render to prevent toast on page load
  const isFirstRender = useRef(true);

  // Trigger toast only AFTER the sync (transition) finishes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isPending) {
      toast.success("Messages updated", { id: "sync-toast" });
    }
  }, [isPending]);

  const handleRefresh = () => {
    startTransition(() => {
      // router.refresh() updates Server Component data without a full page reload
      router.refresh();
    });
  };

  const handleShare = async () => {
    // Web Share API for Mobile/Supported browsers
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Whispr - Send me a message!",
          text: "Tell me something anonymously!",
          url: link,
        });
      } catch (err) {
        // Only show error if it wasn't a user cancellation
        if (err instanceof Error && err.name !== "AbortError") {
          toast.error("Sharing failed");
        }
      }
    } else {
      // Fallback: Clipboard Copy
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        toast.success("Link copied!");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="flex w-full md:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <button
        onClick={handleRefresh}
        disabled={isPending}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw 
          size={16} 
          className={isPending ? "animate-spin" : ""} 
        />
        <span>{isPending ? "Syncing..." : "Sync"}</span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all shadow-sm active:scale-95"
      >
        {copied ? <Check size={16} /> : <Share2 size={16} />}
        <span>{copied ? "Copied" : "Share Link"}</span>
      </button>
    </div>
  );
}