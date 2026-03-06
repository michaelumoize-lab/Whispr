import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/database/models/Message";
import { getServerSession } from "@/lib/get-session";
import mongoose from "mongoose";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = session.user.id;

    // Validate ID format before querying DB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // Atomic operation: ensures the message exists AND belongs to the user
    const deletedMessage = await Message.findOneAndDelete({
      _id: id,
      recipientId: userId,
    });

    if (!deletedMessage) {
      return NextResponse.json(
        { error: "Message not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}