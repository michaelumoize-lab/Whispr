"use client";

import { ClipboardCopy, ExternalLink, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { usePostHog } from "@posthog/react";

interface PersonalLinkProps {
  link: string;
}

export default function PersonalLink({ link }: PersonalLinkProps) {
  const posthog = usePostHog();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      posthog?.capture("personal_link_copied");
      toast.success("Link copied!");
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-card p-4 rounded-2xl border border-border shadow-sm">
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground font-medium mb-1">Your Personal Whisper Link</p>
        <p className="w-full min-w-0 break-all text-sm font-semibold text-foreground">{link}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-border hover:bg-muted text-foreground transition"
          title="Open your public whisper page"
        >
          <span>Visit</span> <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={handleCopy}
          disabled={copied}
          className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition active:scale-95 ${
            copied
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
          }`}
        >
          {copied ? (
            <>
              <span>Copied!</span> <Check className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Copy</span> <ClipboardCopy className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
