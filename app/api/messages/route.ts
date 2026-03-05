import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/database/models/Message";
import { connectDB } from "@/database/mongodb";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { recipientId, text } = await req.json();

    if (!recipientId || !text) {
      return NextResponse.json(
        { error: "recipientId and text required" },
        { status: 400 }
      );
    }

    // Create message
    const message = await Message.create({
      recipientId,
      text,
    });

    // Convert mongoose document
    const plainMessage = message.toObject();

    // Fix ObjectId → string
    const formattedMessage = {
      ...plainMessage,
      _id: plainMessage._id.toString(),
      recipientId: plainMessage.recipientId.toString(),
      createdAt: plainMessage.createdAt?.toISOString(),
    };

    return NextResponse.json(
      { success: true, message: formattedMessage },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating message:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import { Message } from "@/database/models/Message";
// import { connectDB } from "@/database/mongodb";

// export async function POST(req: NextRequest) {
//   await connectDB(); // ensure DB connection

//   try {
//     const { recipientId, text } = await req.json();

//     if (!recipientId || !text) {
//       return NextResponse.json(
//         { error: "recipientId and text required" },
//         { status: 400 }
//       );
//     }

//     // Create message in DB
//     const message = await Message.create({
//       recipientId,
//       text,
//     });

//     // Convert Mongoose doc to plain JS object
//     const plainMessage = message.toObject();

//     return NextResponse.json({ success: true, message: plainMessage }, { status: 201 });
//   } catch (err) {
//     console.error("Error creating message:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
