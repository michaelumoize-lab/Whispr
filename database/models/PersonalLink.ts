// models/PersonalLink.ts
import mongoose from "mongoose";

export interface IPersonalLink {
  userId: string;
  slug: string;
}

const PersonalLinkSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true },
});

export const PersonalLink =
  mongoose.models.PersonalLink ||
  mongoose.model("PersonalLink", PersonalLinkSchema);


