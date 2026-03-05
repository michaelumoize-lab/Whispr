import { getServerSession } from "@/lib/get-session";
import { connectDB } from "@/database/mongodb";
import { Message, IMessage } from "@/database/models/Message";
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
    redirect("/sign-in");
  }

  await connectDB();
  const userId = session.user.id;

  // Use the IMessage interface from your model to avoid 'any'
  const dbMessages = (await Message.find({ recipientId: userId })
    .sort({ createdAt: -1 })
    .lean()) as unknown as IMessage[];

  // Convert Mongoose types (ObjectId and Date) into plain strings
 const messages: SerializedMessage[] = dbMessages.map((msg) => ({
  _id: (msg._id as unknown as string).toString(), 
  text: msg.text,
  createdAt: msg.createdAt instanceof Date 
    ? msg.createdAt.toISOString() 
    : new Date(msg.createdAt).toISOString(),
}));

  const personalLink = `${process.env.NEXT_PUBLIC_APP_URL}/whispr/${userId}`;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage your anonymous messages.</p>
        </div>
        <DashboardActions link={personalLink} />
      </div>

      <PersonalLink link={personalLink} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold px-1">Inbox</h2>
        <MessageList messages={messages} />
      </div>
    </div>
  );
}