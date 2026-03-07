// components/PersonalLink.tsx
"use client";

import { ClipboardCopy } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface PersonalLinkProps {
  link: string;
}

export default function PersonalLink({ link }: PersonalLinkProps) {

    const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-card p-4 rounded-xl border border-border shadow-sm">
      <p className="w-full min-w-0 break-all text-sm sm:text-base">{link}</p>
      <button
        onClick={handleCopy}
        disabled={copied}
        className={`flex shrink-0 items-center justify-center gap-2 px-3 py-2 rounded-lg hover:opacity-90 transition ${
          copied ? "bg-primary/20 text-white"
          : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        {copied ? "Copied!" : "Copy"} <ClipboardCopy className="w-4 h-4" />
      </button>
    </div>
  );
}
