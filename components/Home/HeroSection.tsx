import React from 'react';
import { MessageSquare, Shield, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/20 text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Anonymous Messaging Active
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl leading-[1.1]">
            Receive Honest Feedback. <br />
            <span className="text-primary">Stay Completely Anonymous.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Share your personal link with friends, followers, or the public. They can send messages 
            anonymously, while only you can view them in your private dashboard.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 group">
              Get Your Link
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            <button className="px-8 py-4 bg-secondary text-secondary-foreground border border-border rounded-lg font-semibold hover:bg-muted transition-all">
              See How It Works
            </button>
          </div>
        </div>

        {/* Visual Mockup Section */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main "Dashboard" Glass Card */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-4 md:p-8 relative z-10">
            <div className="grid grid-cols-12 gap-6 items-center">

              {/* Left Side: Mock Anonymous Messages */}
              <div className="col-span-12 lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="text-primary w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold">Your Anonymous Inbox</h3>
                    <p className="text-xs text-muted-foreground">2 new messages today</p>
                  </div>
                </div>
                
                {/* Anonymous Messages */}
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-2xl rounded-tl-none max-w-[80%] text-left border border-border">
                    <p className="text-sm">You&apos;re doing an amazing job! Keep it up.</p>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl rounded-tr-none max-w-[80%] ml-auto text-right">
                    <p className="text-sm">Can you give feedback on my recent post?</p>
                  </div>
                </div>

                {/* Input Mock */}
                <div className="pt-4 flex gap-2">
                  <div className="h-10 flex-1 bg-background border border-border rounded-md px-4 flex items-center text-muted-foreground text-sm">
                    Type a message...
                  </div>
                  <button className="bg-primary p-2 rounded-md">
                    <MessageSquare className="text-primary-foreground w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Side: Feature Highlights */}
              <div className="hidden lg:col-span-5 lg:flex flex-col gap-4">
                <div className="p-4 bg-background/80 border border-border rounded-xl shadow-sm transform translate-x-4">
                  <div className="flex gap-3 items-start">
                    <Shield className="text-primary w-5 h-5 mt-1" />
                    <div>
                      <p className="font-semibold text-sm">100% Private</p>
                      <p className="text-xs text-muted-foreground">Only you see the messages.</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background/80 border border-border rounded-xl shadow-sm transform translate-x-8">
                  <div className="flex gap-3 items-start">
                    
                    <div>
                      <p className="font-semibold text-sm">Share Anywhere</p>
                      <p className="text-xs text-muted-foreground">Post your unique link anywhere online.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Floating UI Elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-48 md:h-48 bg-primary/10 border border-primary/20 rounded-2xl -z-0 rotate-6 backdrop-blur-sm hidden sm:block" />
          <div className="absolute -top-6 -right-6 w-32 h-32 md:w-48 md:h-48 bg-accent border border-primary/10 rounded-2xl -z-0 -rotate-3 backdrop-blur-sm hidden sm:block" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
