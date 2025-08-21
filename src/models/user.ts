
import mongoose, { Schema, Document, Model, trusted } from "mongoose";

export interface IUser extends Document {
  name: string; // or email, depending on your signup process
  password: string; // hashed password
  mlUserId: string; 
  email: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true,  },
    password: { type: String, required: true },
    mlUserId: { type: String, required: true, unique: true }, 
    email: {type:String, required:true}
  },
  { timestamps: true }
);


export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
