"use client";

import React, { useState } from "react";
import { Inbox, Share2, Trash2, ArrowRight, MessageCircle, Send, Check } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const DEMO_WHISPERS = [
  {
    id: 1,
    text: "You always bring so much positive energy to every room you walk into!",
    date: "Today at 10:24 AM",
  },
  {
    id: 2,
    text: "Your presentation yesterday was so inspiring, honestly learned so much.",
    date: "Yesterday at 8:15 PM",
  },
  {
    id: 3,
    text: "Can you recommend the books or resources that helped you grow the most?",
    date: "2 days ago",
  },
];

export default function HeroSection() {
  const { data: session } = authClient.useSession();
  const [whispers, setWhispers] = useState(DEMO_WHISPERS);
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDelete = (id: number) => {
    setDeletedId(id);
    setTimeout(() => {
      setWhispers((prev) => prev.filter((w) => w.id !== id));
      setDeletedId(null);
    }, 250);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground max-w-4xl leading-[1.1]">
            Receive Honest Feedback. <br />
            <span className="text-primary">Stay Completely Anonymous.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Share your personal link with friends, followers, or the public. They send whispers
            anonymously to your inbox, and you can export your favorites as story cards.
          </p>

          <div className="mt-8 sm:mt-10 flex w-full sm:w-auto flex-col sm:flex-row items-center gap-3.5">
            <Link
              href={session ? "/dashboard" : "/sign-up"}
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95"
            >
              <span>{session ? "Go to Dashboard" : "Get Your Link"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#how-it-works"
              className="flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground border border-border rounded-full font-semibold hover:bg-muted active:scale-95 transition-all text-sm sm:text-base"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Visual Mockup Section: Inbox on Left, Public Sender Form on Right */}
        <div id="how-it-works" className="relative max-w-5xl mx-auto scroll-mt-24">
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* Left Side: Account Owner's Inbox */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                {/* Inbox Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border/70">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-foreground">Your Private Inbox</h3>
                      <p className="text-xs text-muted-foreground">Sorted chronologically</p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {whispers.length} {whispers.length === 1 ? "Whisper" : "Whispers"}
                  </span>
                </div>

                {/* Personal Link Banner */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs">
                  <span className="truncate font-mono text-muted-foreground">
                    whispr.app/<span className="text-foreground font-semibold">alex</span>
                  </span>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-background border border-border text-foreground hover:bg-muted font-medium transition flex items-center gap-1"
                  >
                    {copied ? <Check size={12} className="text-green-500" /> : null}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Stacked Whispers (Inbox cards) */}
                <div className="space-y-2.5">
                  {whispers.map((w) => (
                    <div
                      key={w.id}
                      className={`p-3.5 rounded-2xl bg-card border border-border shadow-sm flex justify-between items-start gap-3 transition-all duration-200 ${
                        deletedId === w.id ? "opacity-0 scale-95" : "hover:border-primary/40"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-foreground font-normal leading-relaxed">
                          {w.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[11px] text-muted-foreground">{w.date}</span>
                          <span className="text-[11px] text-primary/90 font-medium flex items-center gap-1">
                            <Share2 size={10} /> Share card
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="p-1.5 text-muted-foreground hover:text-primary rounded-lg transition" title="Share as card">
                          <Share2 size={14} />
                        </span>
                        <button
                          onClick={() => handleDelete(w.id)}
                          className="p-1.5 text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-lg transition"
                          title="Delete whisper"
                          aria-label="Delete whisper"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {whispers.length === 0 && (
                    <div className="p-6 text-center text-xs text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border">
                      Inbox cleared. Refresh to see sample whispers.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Public Sender View (What visitors see when they click your link) */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-background/90 to-background/50 border border-primary/20 shadow-md">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Public Sender View
                  </div>

                  <div className="text-center space-y-2 mb-4">
                    <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <MessageCircle size={20} />
                    </div>
                    <h4 className="font-bold text-sm text-foreground">
                      Send a whisper to <span className="text-primary">@alex</span>
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      They will never know who sent it. Be kind!
                    </p>
                  </div>

                  {/* Form Mockup */}
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="w-full h-24 p-3 rounded-xl border border-border bg-card text-xs text-muted-foreground">
                        Write your anonymous message here...
                      </div>
                      <span className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
                        0/500
                      </span>
                    </div>

                    <div className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-bold text-xs rounded-full flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 cursor-default">
                      <span>Send Whisper</span>
                      <Send size={12} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border/50 text-center">
                  <p className="text-[11px] text-muted-foreground">
                    🔒 100% Anonymous • No account required to whisper
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Floating UI Elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-48 md:h-48 bg-primary/10 border border-primary/20 rounded-3xl -z-0 rotate-6 backdrop-blur-sm hidden sm:block pointer-events-none" />
          <div className="absolute -top-6 -right-6 w-32 h-32 md:w-48 md:h-48 bg-accent border border-primary/10 rounded-3xl -z-0 -rotate-3 backdrop-blur-sm hidden sm:block pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
