import { getServerSession } from "@/lib/get-session";
import { Message } from "@/database/models/Message";
import { getOrCreateUserSlug } from "@/lib/slug";
import { getDb } from "@/lib/db";
import MessageList from "@/components/MessageList";
import PersonalLink from "@/components/PersonalLink";
import DashboardActions from "@/components/DashboardActions";
import { redirect } from "next/navigation";

// Define the shape of the serialized message for the Client Component
export interface SerializedMessage {
  _id: string;
  text: string;
  createdAt: string;
}

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/sign-in?error=unauthorized");
  }

  const userId = session.user.id;

  // Ensure DB connection is active
  await getDb();

  const [dbMessages, userSlug] = await Promise.all([
    Message.find({ recipientId: userId }).sort({ createdAt: -1 }).lean(),
    getOrCreateUserSlug(userId, session.user.name),
  ]);

  // Convert Mongoose types (ObjectId and Date) into plain strings
  const messages = dbMessages.map((msg) => ({
    _id: msg._id.toString(),
    text: msg.text,
    createdAt: msg.createdAt
      ? (msg.createdAt instanceof Date ? msg.createdAt.toISOString() : new Date(msg.createdAt).toISOString())
      : new Date().toISOString(),
  }));

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") || "http://localhost:3000";
  const linkIdentifier = userSlug || userId;
  const personalLink = `${baseUrl}/whispr/${linkIdentifier}`;

  return (
    <div className="max-w-5xl mt-6 mx-auto space-y-6 sm:space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome, <span className="text-primary">{session.user.name || "friend"}</span>!
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage and share your anonymous whispers.</p>
        </div>
        <DashboardActions link={personalLink} />
      </div>

      <PersonalLink link={personalLink} />

      <div>
        <MessageList
          messages={messages}
          userHandle={linkIdentifier}
          personalLink={personalLink}
        />
      </div>
    </div>
  );
}
