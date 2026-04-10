import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/database/models/Message";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { recipientId, text } = await req.json();

    if (!recipientId || !text?.trim()) {
      return NextResponse.json(
        { error: "Recipient ID and message text are required" },
        { status: 400 }
      );
    }

    // Query Better Auth's user collection directly
    const db = await getDb();
    const user = await db.collection("user").findOne({
      _id: new ObjectId(recipientId),
    });

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    const message = await Message.create({
      recipientId: new ObjectId(recipientId),
      text: text.trim(),
    });

    const formattedMessage = message.toJSON();

    return NextResponse.json(
      {
        success: true,
        message: {
          ...formattedMessage,
          _id: formattedMessage._id?.toString() ?? "",
          recipientId: formattedMessage.recipientId?.toString() ?? "",
        },
      },
      { status: 201 }
    );

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    console.error("Error creating message:", errorMessage);
    return NextResponse.json({ error: "Failed to send whisper" }, { status: 500 });
  }
}