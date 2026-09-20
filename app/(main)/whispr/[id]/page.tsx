import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import SendMessageForm from "@/components/SendMessageForm";
import { getDb } from "@/lib/db";
import { PersonalLink } from "@/database/models/PersonalLink";
import { ObjectId } from "mongodb";
import type { Metadata } from "next";

async function findUserByIdOrSlug(identifier: string) {
  if (!identifier?.trim()) return null;
  const trimmed = identifier.trim();

  try {
    const database = await getDb();

    // 1. Direct match by ObjectId
    if (ObjectId.isValid(trimmed)) {
      const user = await database.collection("user").findOne({
        _id: new ObjectId(trimmed),
      });
      if (user) return user;
    }

    // 2. Lookup by custom slug in PersonalLink collection
    const linkRecord = await PersonalLink.findOne({
      slug: trimmed.toLowerCase(),
    }).lean();

    if (linkRecord?.userId && ObjectId.isValid(linkRecord.userId)) {
      return await database.collection("user").findOne({
        _id: new ObjectId(linkRecord.userId),
      });
    }

    return null;
  } catch (error) {
    console.error("User lookup error:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = await findUserByIdOrSlug(id);

  if (user?.name) {
    return {
      title: `Send a whisper to @${user.name}`,
      description: `Send an anonymous message to @${user.name} on Whispr.`,
    };
  }

  return {
    title: "Send a Whisper",
    description: "Send an anonymous message on Whispr.",
  };
}

export default async function PublicProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const user = await findUserByIdOrSlug(id);

  if (!user) return notFound();

  const displayName = user.name || "Anonymous User";

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <MessageCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight break-words">
            Send a whisper to <span className="text-primary">@{displayName}</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            They will never know who sent it. Be kind!
          </p>
        </div>

        {/* Pass the ID as a string to the client component */}
        <SendMessageForm recipientId={user._id.toString()} />
      </div>
    </div>
  );
}