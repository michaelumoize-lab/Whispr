import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/mongodb";
import { Message } from "@/database/models/Message";
import { getServerSession } from "@/lib/get-session";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 1. Define params as a Promise
) {
  try {
    await connectDB();

    // 2. Await the params to get the actual ID string
    const { id } = await params;

    // 3. Check if user is logged in
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 4. Delete the message
    // We verify recipientId to ensure users can ONLY delete messages sent to them
    const deletedMessage = await Message.findOneAndDelete({
      _id: id,
      recipientId: session.user.id,
    });

    if (!deletedMessage) {
      return NextResponse.json(
        { error: "Message not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}