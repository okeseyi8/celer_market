
import mongoose, { Schema, Document, Model } from "mongoose";

export interface OldRecProduct extends Document {
  user_id: string;
  k: string;
  item_id: string;
  title: string;
  image_url: string;
}

const ProductSchema: Schema<OldRecProduct> = new Schema(
  {
    user_id: { type: String, required: true },
    k: { type: String, required: true },
    image_url: { type: String },
    title: { type: String},
    item_id: { type: String},
  },
  { timestamps: true }
);

export const Products: Model<OldRecProduct> =
  mongoose.models.oldProducts || mongoose.model<OldRecProduct>("oldProducts", ProductSchema);
