import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/database/models/Message";
import { getDb } from "@/lib/db"; // Use the getter function
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

    // 1. Get the database instance (and trigger Mongoose connection)
    const database = await getDb();

    // 2. Validate and find user using the raw driver
    let user = null;
    if (ObjectId.isValid(recipientId)) {
      user = await database.collection("user").findOne({ 
        _id: new ObjectId(recipientId) 
      });
    }
    
    // Fallback check if your DB stores IDs as strings (rare but possible)
    if (!user) {
      user = await database.collection("user").findOne({ _id: recipientId });
    }

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // 3. Create the message via Mongoose
    // Mongoose is already connected because getDb() awaited connectDB()
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
          _id: formattedMessage._id.toString(),
          recipientId: formattedMessage.recipientId.toString(),
        } 
      },
      { status: 201 }
    );

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    console.error("Error creating message:", errorMessage);
    
    return NextResponse.json(
      { error: "Failed to send whisper" },
      { status: 500 }
    );
  }
}