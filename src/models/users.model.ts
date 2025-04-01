import mongoose, { Document } from "mongoose";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.USER,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.users || mongoose.model("User", userSchema);
