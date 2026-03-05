// app/(main)/layout.tsx

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whispr",
  description: "Whispr - Send me an anonymous message!",
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
        <Toaster />
        <ThemeProvider>
          <main className="px-6 md:px-8 lg:px-12 py-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}