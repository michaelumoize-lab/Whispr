// app/(main)/layout.tsx

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { PostHogProvider } from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whispr",
  description: "Whispr - An anonymous messaging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className={`${outfit.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <PostHogProvider>
          <Toaster />
          <ThemeProvider>
            <div className="overflow-x-hidden min-h-screen flex flex-col">
              {children}
            </div>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
