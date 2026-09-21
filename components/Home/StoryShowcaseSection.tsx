import React from "react";
import { Sparkles, Download, Share2, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StoryShowcaseSection() {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story Cards Visual Preview */}
          <div className="lg:col-span-6 flex justify-center relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Back Stacked Card (Midnight Aurora theme mockup) */}
            <div className="absolute top-4 -right-2 sm:right-6 w-full max-w-[300px] sm:max-w-[320px] h-[360px] rounded-3xl p-6 bg-gradient-to-b from-zinc-950 via-slate-900 to-indigo-950/60 border border-white/10 shadow-2xl rotate-6 opacity-40 scale-95 pointer-events-none hidden sm:block" />

            {/* Front Main Card (Amber Glow Whispr brand theme) */}
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-b from-zinc-950 via-zinc-900 to-amber-950/40 border border-white/15 shadow-2xl text-white -rotate-1 hover:rotate-0 transition-transform duration-500">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md text-amber-400 bg-amber-400/10 border-amber-400/20">
                  <span>🤫</span>
                  <span>Whispr</span>
                </div>
                <Quote size={22} className="opacity-40 text-amber-400" />
              </div>

              {/* Card Body */}
              <div className="my-auto py-8">
                <p className="text-lg font-medium tracking-tight leading-relaxed text-white/95">
                  &ldquo;You always inspire everyone around you to dream bigger. Never stop being you!&rdquo;
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col items-center text-center gap-1 text-xs">
                <span className="font-semibold tracking-tight text-white/90">
                  @michael
                </span>
                <span className="text-[10px] text-white/50">
                  whispr.app/michael
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/20 text-accent-foreground text-xs font-semibold">
              <Sparkles size={14} className="text-primary" />
              Social-Ready Sharing
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Turn honest whispers into <span className="text-primary">viral story cards</span>
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed">
              Every whisper you receive can be exported into an aesthetic, high-resolution story card with a single tap. Download the crystal-clear image or share it directly to Instagram Stories, WhatsApp, Snapchat, or Twitter.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <Download size={18} />
                </div>
                <h4 className="font-bold text-sm text-foreground">High-DPI Export</h4>
                <p className="text-xs text-muted-foreground mt-0.5">3x retina resolution PNGs with zero compression blur.</p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <Share2 size={18} />
                </div>
                <h4 className="font-bold text-sm text-foreground">Native Share</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Direct integration with iOS and Android share sheets.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-bold text-sm rounded-full hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                <span>Try It with Your Link</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
