import React from "react";
import Link from "next/link";
import { Twitter, Github, Instagram, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-foreground">Whispr</div>

        {/* Quick Links */}
        <div className="flex gap-6 text-sm text-muted-foreground flex-wrap justify-center font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <a href="#how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a href="#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Whispr. All rights reserved.
      </div>

      <div className="mt-12 w-full">
        {/* Fading line separator */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground/80 transition-colors">
          <span>Developed with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span>by</span>
          <a
            href="https://michael-umoize.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:text-primary tracking-tight transition-colors underline-offset-4 hover:underline"
          >
            Michael Umoize
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
