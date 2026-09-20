"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function CtaSection() {
  const { data: session } = authClient.useSession();

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 overflow-hidden bg-gradient-to-b from-card to-card/60 border border-primary/20 shadow-2xl text-center">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles size={14} /> Get Started In 30 Seconds
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
              Ready to find out what people <span className="text-primary">really think?</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Create your personal link, drop it in your bio or status, and start receiving honest, anonymous feedback today.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={session ? "/dashboard" : "/sign-up"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base hover:opacity-90 active:scale-95 transition shadow-lg shadow-primary/20"
              >
                <span>{session ? "Go to Dashboard" : "Get Your Free Link"}</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              100% Free Forever • No Credit Card Required • Instant Setup
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
