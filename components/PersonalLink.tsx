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
    <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
      <p className="truncate">{link}</p>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
      >
        Copy <ClipboardCopy className="w-4 h-4" />
      </button>
    </div>
  );
}
