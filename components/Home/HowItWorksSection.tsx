import React from "react";
import { Link2, Share2, MessageCircleHeart } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Get Your Personal Link",
    description:
      "Create your free account in under 30 seconds. You'll receive a secure, personal URL you can share anywhere.",
    icon: Link2,
  },
  {
    step: "02",
    title: "Share with Friends & Followers",
    description:
      "Paste your link into your Instagram Bio, WhatsApp Status, Snapchat, or Twitter. Senders need zero login.",
    icon: Share2,
  },
  {
    step: "03",
    title: "Read & Share to Stories",
    description:
      "Read genuine compliments, questions, and honest truths in your private inbox. Export your favorites as image cards.",
    icon: MessageCircleHeart,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-muted/20 border-y border-border/50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            Simple 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            How Whispr works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            No friction, no complicated apps. Just honest conversations in three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Icon size={24} />
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
