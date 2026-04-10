import Link from "next/link";
import { Ghost, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-center">
      <div className="space-y-6 max-w-sm">
        {/* Visual Icon */}
        <div className="flex justify-center">
          <div className="bg-muted p-6 rounded-full animate-bounce">
            <Ghost className="w-16 h-16 text-muted-foreground" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
          <h2 className="text-xl font-semibold">Whisper Lost in Space</h2>
          <p className="text-muted-foreground">
            The link might be broken or the user might have deleted their account. <br />
            Ask them to send you a new link.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition shadow-lg"
        >
          <Home size={18} />
          Back to Safety
        </Link>
      </div>
    </div>
  );
}