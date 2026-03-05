"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import ModeToggle from "@/components/ModeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setMobileOpen(false);
          router.push("/");
        },
      },
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-3 sm:top-4 z-[100] mx-auto flex w-[95%] max-w-5xl items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-card/70 backdrop-blur-xl text-foreground border border-border/50 shadow-lg rounded-full transition-all duration-300">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0">
        <div className="bg-primary p-1.5 rounded-lg">
          <MessageCircle className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-base sm:text-lg tracking-tight truncate">Whispr</span>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <ModeToggle />

        {!isPending && (
          <div className="flex items-center">
            {session ? (
              /* Desktop User Avatar (Hidden on Mobile) */
              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-all"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-primary/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                      {getInitials(session.user.name)}
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <div 
                    onMouseLeave={() => setShowUserMenu(false)}
                    className="absolute right-0 mt-3 w-52 bg-card border border-border rounded-2xl shadow-xl py-2 z-[110] animate-in fade-in zoom-in-95 duration-200"
                  >
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Desktop Auth Link (Hidden on Mobile) */
              <Link
                href="/sign-in"
                className="hidden md:flex bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition"
              >
                Get Started
              </Link>
            )}
          </div>
        )}

        {/* Hamburger - Always the only thing visible on mobile besides toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-foreground hover:bg-muted rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[150] animate-in fade-in duration-300">
          <div 
            ref={menuRef}
            className="absolute top-4 right-4 w-[calc(100%-2rem)] max-w-[280px] bg-card border border-border rounded-[2rem] shadow-2xl p-5 sm:p-6 animate-in slide-in-from-top-4 duration-300"
          >
            <div className="flex justify-between items-center mb-8">
               <span className="font-bold text-lg px-2">Menu</span>
               <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
            </div>

            <div className="flex flex-col gap-2">
              {session ? (
                <>
                  <div className="flex items-center gap-3 p-2 mb-4 bg-muted/50 rounded-2xl">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {getInitials(session.user.name)}
                      </div>
                    )}
                    <div className="flex flex-col truncate">
                      <p className="font-bold text-sm truncate">{session.user.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{session.user.email}</p>
                    </div>
                  </div>
                  
                  <Link 
                    href="/dashboard" 
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors font-medium"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors font-medium text-left"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold shadow-lg shadow-primary/20"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
