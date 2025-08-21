import mongoose, { Schema, Document, Model } from "mongoose";

export interface PurchasedProduct extends Document {
  user_id: string;
  item_id: string;
  verified_purchase: string;
}

const PurchasedProductsSchema: Schema = new Schema(
  {
    user_id: { type: String, required: true },
    item_id: { type: String },
    verified_purchase: { type: String },
  },
  { timestamps: true }
);

export const Purchasedproducts: Model<PurchasedProduct> =
  mongoose.models.purchasedproducts ||
  mongoose.model<PurchasedProduct>(
    "purchasedproducts",
    PurchasedProductsSchema
  );
