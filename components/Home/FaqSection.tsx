"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is Whispr really 100% anonymous?",
    answer:
      "Yes. We do not store IP addresses, browser fingerprints, or sender accounts. When someone submits a message through your link, only the text content is stored in our database.",
  },
  {
    question: "Do senders need to sign up or download an app?",
    answer:
      "Not at all. Anyone who clicks your link can immediately type and send a whisper from any mobile or desktop web browser without creating an account.",
  },
  {
    question: "Can I delete or remove messages I receive?",
    answer:
      "Absolutely. Inside your private dashboard, you can delete any whisper with a single click. Deletions are instantaneous and permanently removed from our servers.",
  },
  {
    question: "How do I share whispers to my Instagram Story or WhatsApp Status?",
    answer:
      "Just tap on any whisper in your dashboard to open the visual card preview. Pick your favorite gradient theme, then tap 'Share' or 'Download' to post it directly to your social stories.",
  },
  {
    question: "Is Whispr free to use?",
    answer:
      "Yes! Whispr is completely free. You can create your personal link and receive unlimited anonymous messages at no cost.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-muted/20 border-t border-border/50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <HelpCircle size={14} /> Got Questions?
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Everything you need to know about privacy, sharing, and receiving whispers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-card border border-border overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
