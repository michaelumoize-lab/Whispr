import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import SendMessageForm from "@/components/SendMessageForm";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let user;
  try {
    user = await db.collection("user").findOne({ _id: new ObjectId(id) });
  } catch {
    return notFound(); 
  }

  if (!user) return notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:p-6 bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <MessageCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight break-words">
            Send a whisper to <span className="text-primary">@{user.name}</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            They will never know who sent it. Be kind!
          </p>
        </div>

        <SendMessageForm recipientId={user._id.toString()} />
      </div>
    </div>
  );
}
