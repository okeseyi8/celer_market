import mongoose, { Schema, Document, Model } from "mongoose";

export interface NewRecProduct extends Document {
  user_id: string;
  k: string;
  item_id: string;
  title: string;
  image_url: string;
}

const ProductSchema: Schema<NewRecProduct> = new Schema(
  {
    user_id: { type: String, required: true },
    k: { type: String, required: true },
    image_url: { type: String },
    title: { type: String },
    item_id: { type: String },
  },
  { timestamps: true }
);

export const Newproducts: Model<NewRecProduct> =
  mongoose.models.newProducts ||
  mongoose.model<NewRecProduct>("newProducts", ProductSchema);
