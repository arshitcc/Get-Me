import mongoose, { Document } from "mongoose";

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface IProfile extends Document {
  _id: mongoose.Types.ObjectId;
  userId : mongoose.Types.ObjectId;
  name: string;
  photo: string;
  description: string;
  interests: string[];
  socialLinks: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new mongoose.Schema<IProfile>(
  {
    userId : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    address: {
      type: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true, default: "India" },
        postalCode: { type: String, required: true },
        coordinates: {
          lat: { type: Number },
          lng: { type: Number },
        },
      },
    },
    interests: [{ type: String }],
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.models.profiles || mongoose.model("Profile", profileSchema);
