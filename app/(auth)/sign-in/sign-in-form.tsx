"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const errorParam = searchParams.get("error");

  useEffect(() => {
    if (errorParam === "unauthorized") {
      toast.error("Please sign in to access your dashboard", {
        id: "unauthorized-error", 
      });
      
      // Remove error param from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [errorParam, searchParams]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMeValue = watch("rememberMe");

  async function onSubmit(data: SignInValues) {
    setError(null);
    const toastId = toast.loading("Signing you in...");

    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (error) {
        const message = error.message || "Invalid email or password";
        setError(message);
        toast.error(message, { id: toastId });
      } else {
        toast.success("Welcome back!", { id: toastId });
        router.push(redirect ?? "/dashboard");
        router.refresh(); // Ensure session state is updated
      }
    } catch (err) {
      toast.error("An unexpected error occurred", { id: toastId });
      console.error(err);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setError(null);
    
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: redirect ?? "/dashboard",
    });

    if (error) {
      // Don't show toast if user just closed the popup
      if (error.message !== "User cancelled") {
        const message = error.message || `Failed to sign in with ${provider}`;
        setError(message);
        toast.error(message);
      }
    }
  }

  return (
    <div className="w-full max-w-md bg-card text-card-foreground rounded-xl border border-border shadow-lg p-6 md:p-8">
      <div className="mb-8 space-y-2">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>

        <h1 className="text-2xl font-bold tracking-tight">
          Sign In to <span className="text-primary">Whispr</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none">Password</label>
          </div>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-ring"
            checked={rememberMeValue}
            onChange={(e) => setValue("rememberMe", e.target.checked)}
          />
          <label
            htmlFor="rememberMe"
            className="text-sm font-medium leading-none"
          >
            Remember me
          </label>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium animate-in fade-in zoom-in duration-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center w-full h-10 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-all disabled:opacity-50 gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Login"
          )}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center w-full h-10 px-4 py-2 bg-background border border-input text-foreground font-medium rounded-md hover:bg-muted transition-all disabled:opacity-50 gap-2"
        >
          <GoogleIcon width="1.2em" height="1.2em" />
          Google
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}