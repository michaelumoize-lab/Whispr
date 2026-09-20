// models/PersonalLink.ts
import mongoose from "mongoose";

export interface IPersonalLink {
  userId: string;
  slug: string;
}

const PersonalLinkSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
    index: true,
    unique: true,
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
  },
});

export const PersonalLink =
  mongoose.models.PersonalLink ||
  mongoose.model("PersonalLink", PersonalLinkSchema);


