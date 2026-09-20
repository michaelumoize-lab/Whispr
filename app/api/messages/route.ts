import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/database/models/Message";
import { getDb } from "@/lib/db";
import { createMessageSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createMessageSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid request data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { recipientId, text } = result.data;

    // Query Better Auth's user collection directly
    const db = await getDb();
    const user = await db.collection("user").findOne({
      _id: new ObjectId(recipientId),
    });

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }

    const message = await Message.create({
      recipientId,
      text,
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