import React from "react";
import { ShieldCheck, Zap, Sparkles, Trash2 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Zero-Tracking Anonymity",
    description:
      "We strictly do not store IP addresses, browser footprints, or sender metadata. Honest feedback should stay genuinely anonymous.",
    tag: "Privacy First",
  },
  {
    icon: Zap,
    title: "Frictionless for Senders",
    description:
      "Your friends, colleagues, and followers never need to create an account or download an app. They simply tap your link and whisper.",
    tag: "No Signup Needed",
  },
  {
    icon: Sparkles,
    title: "Viral Social Story Cards",
    description:
      "Turn your favorite whispers into beautiful story cards with custom gradients, then download or share them to Instagram and WhatsApp.",
    tag: "Ready for Stories",
  },
  {
    icon: Trash2,
    title: "Complete Inbox Ownership",
    description:
      "Keep what you love and discard what you don't. Instant deletions, live inbox syncing, and ownership checks keep you in control.",
    tag: "Total Control",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 relative scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            Built for Privacy & Expression
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Everything you need for <span className="text-primary">authentic feedback</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Crafted for speed, safety, and sharing. Whispr gives you a safe space to hear what people really think.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
