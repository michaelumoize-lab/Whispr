"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, Copy, Sparkles, Quote, Loader2, Check } from "lucide-react";
import { toPng, toBlob } from "html-to-image";
import { toast } from "react-hot-toast";

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: {
    _id: string;
    text: string;
    createdAt: string;
  } | null;
  userHandle?: string;
  personalLink?: string;
}

const THEMES = [
  {
    id: "amber",
    name: "Amber Glow",
    bgClass: "from-zinc-950 via-zinc-900 to-amber-950/40",
    badgeClass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    glowClass: "bg-amber-500/20",
    accentColor: "#f59e0b",
    bulletColor: "bg-amber-500",
  },
  {
    id: "purple",
    name: "Midnight Eclipse",
    bgClass: "from-zinc-950 via-slate-900 to-indigo-950/50",
    badgeClass: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    glowClass: "bg-indigo-500/20",
    accentColor: "#818cf8",
    bulletColor: "bg-indigo-500",
  },
  {
    id: "rose",
    name: "Sunset Blaze",
    bgClass: "from-zinc-950 via-purple-950/30 to-rose-950/40",
    badgeClass: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    glowClass: "bg-rose-500/20",
    accentColor: "#fb7185",
    bulletColor: "bg-rose-500",
  },
  {
    id: "dark",
    name: "Minimal Obsidian",
    bgClass: "from-zinc-950 to-zinc-900",
    badgeClass: "text-zinc-300 bg-zinc-800/60 border-zinc-700/40",
    glowClass: "bg-zinc-600/10",
    accentColor: "#a1a1aa",
    bulletColor: "bg-zinc-400",
  },
];

export default function ShareCardModal({
  isOpen,
  onClose,
  message,
  userHandle,
  personalLink,
}: ShareCardModalProps) {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Lock background scroll & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !message) return null;

  const displayLink = personalLink
    ? personalLink.replace(/^https?:\/\//, "")
    : userHandle
    ? `whispr.app/whispr/${userHandle}`
    : "whispr.app";

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    const toastId = toast.loading("Generating high-res card...");

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `whispr-${message._id.slice(-6)}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Card downloaded!", { id: toastId });
    } catch (error) {
      console.error("Failed to generate image:", error);
      toast.error("Failed to export image", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    const toastId = toast.loading("Preparing card to share...");

    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });

      if (!blob) throw new Error("Could not create image file");

      const file = new File([blob], `whispr-${message._id.slice(-6)}.png`, {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Anonymous Whisper",
          text: "Look what someone whispered to me on Whispr!",
        });
        toast.dismiss(toastId);
      } else {
        // Fallback to clipboard if Web Share with files is not supported
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Image copied to clipboard! Ready to paste anywhere.", {
          id: toastId,
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        toast.dismiss(toastId);
      } else {
        console.error("Sharing failed:", error);
        toast.error("Sharing failed. Try downloading instead.", { id: toastId });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    const toastId = toast.loading("Copying image...");

    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });

      if (!blob) throw new Error("Failed to create blob");

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Image copied to clipboard!", { id: toastId });
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      toast.error("Clipboard image copy not supported on this browser.", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-5 sm:p-6 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold leading-none">Share Whisper</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Export as a story or social media card
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Theme Selector */}
          <div className="my-4 flex items-center justify-center gap-2">
            {THEMES.map((theme) => {
              const isSelected = selectedTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${theme.bulletColor}`} />
                  <span>{theme.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Visual Card Preview (Target to screenshot) */}
          <div className="flex justify-center my-2">
            <div
              ref={cardRef}
              className={`relative w-full max-w-[360px] min-h-[380px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden bg-gradient-to-b ${selectedTheme.bgClass} border border-white/15 shadow-2xl text-white`}
            >
              {/* Decorative Ambient Glow Orbs */}
              <div
                className={`absolute -top-16 -right-16 w-44 h-44 rounded-full ${selectedTheme.glowClass} blur-3xl pointer-events-none`}
              />
              <div
                className={`absolute -bottom-16 -left-16 w-44 h-44 rounded-full ${selectedTheme.glowClass} blur-3xl pointer-events-none`}
              />

              {/* Card Top: Brand Badge & Quote Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${selectedTheme.badgeClass}`}
                >
                  <span>🤫</span>
                  <span>Whispr</span>
                </div>
                <div className="opacity-40 text-white">
                  <Quote size={24} />
                </div>
              </div>

              {/* Card Center: Anonymous Message Body */}
              <div className="relative z-10 my-auto py-6">
                <p className="text-lg sm:text-xl font-medium tracking-tight leading-relaxed text-white/95 break-words whitespace-pre-wrap selection:bg-amber-400 selection:text-black">
                  &ldquo;{message.text}&rdquo;
                </p>
              </div>

              {/* Card Bottom: Call to Action & Link */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col items-center text-center gap-1">
                <p className="text-[11px] font-medium text-white/70">
                  Send me an anonymous message using the link
                </p>
                <span className="text-xs font-semibold tracking-tight text-white/95 break-all">
                  {displayLink}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold rounded-2xl hover:opacity-90 active:scale-95 transition disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              <span>Download</span>
            </button>

            <button
              onClick={handleShare}
              disabled={isGenerating}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 bg-secondary text-secondary-foreground text-xs sm:text-sm font-semibold rounded-2xl hover:bg-muted active:scale-95 transition border border-border disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Share2 size={16} />
              )}
              <span>Share</span>
            </button>

            <button
              onClick={handleCopyImage}
              disabled={isGenerating}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 bg-secondary text-secondary-foreground text-xs sm:text-sm font-semibold rounded-2xl hover:bg-muted active:scale-95 transition border border-border disabled:opacity-50"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
