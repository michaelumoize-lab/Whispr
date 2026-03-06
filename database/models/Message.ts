import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    recipientId: { 
      type: String, 
      required: true 
    },
    text: { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: true 
  }
);

// In Next.js, we check if the model already exists to prevent re-compilation errors during hot reloads
export const Message = 
  mongoose.models.Message || 
  mongoose.model("Message", MessageSchema);
