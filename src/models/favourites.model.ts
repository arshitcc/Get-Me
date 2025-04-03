import mongoose, { Document } from "mongoose";

export interface IFavourite extends Document {
    userId: mongoose.Types.ObjectId;
    place_id: string; // ola place_id
    createdAt: Date;
    updatedAt: Date;
}

const favouriteSchema = new mongoose.Schema<IFavourite>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        place_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Favourite = mongoose.models.favourites || mongoose.model("Favourite", favouriteSchema);