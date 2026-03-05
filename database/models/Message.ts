// // database/models/Message.ts
// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface IMessage extends Document {
//   recipientId: string;
//   text: string;
//   createdAt: Date;
// }

// const MessageSchema: Schema<IMessage> = new Schema(
//   {
//     recipientId: { type: String, required: true },
//     text: { type: String, required: true },
//   },
//   { timestamps: true } // adds createdAt & updatedAt
// );

// export const Message: Model<IMessage> =
//   mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);


// database/models/Message.ts
import mongoose, { Schema, Document, Model, models, model } from "mongoose";

export interface IMessage extends Document {
  recipientId: string;
  text: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    recipientId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

// Define the model constant clearly
const Message: Model<IMessage> = models.Message || model<IMessage>("Message", MessageSchema);

// Export it as a named export
export { Message };