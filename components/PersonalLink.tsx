// components/PersonalLink.tsx
"use client";

import { ClipboardCopy } from "lucide-react";
import { toast } from "react-hot-toast";

interface PersonalLinkProps {
  link: string;
}

export default function PersonalLink({ link }: PersonalLinkProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied!");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-card p-4 rounded-xl border border-border shadow-sm">
      <p className="w-full min-w-0 break-all text-sm sm:text-base">{link}</p>
      <button
        onClick={handleCopy}
        className="flex shrink-0 items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
      >
        Copy <ClipboardCopy className="w-4 h-4" />
      </button>
    </div>
  );
}
