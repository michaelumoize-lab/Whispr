"use client";

import { RefreshCw, Share2, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DashboardActions({ link }: { link: string }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleRefresh = () => {
    setIsRefreshing(true);
    // This triggers a re-fetch of the Server Component data
    router.refresh(); 
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Messages updated");
    }, 800);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Whispr - Send me a message!",
          text: "Tell me something anonymously!",
          url: link,
        });
      } catch (err) {
        // User cancelled or share failed
        console.error("Sharing failed", err);
      }
    } else {
      // Fallback for desktop browsers
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex w-full md:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-accent transition disabled:opacity-50"
      >
        <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
        Sync
      </button>

      <button
        onClick={handleShare}
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition shadow-sm"
      >
        {copied ? <Check size={16} /> : <Share2 size={16} />}
        {copied ? "Copied" : "Share Link"}
      </button>
    </div>
  );
}
