import mongoose, { Document } from "mongoose";

export interface IFriend extends Document {
    _id: mongoose.Types.ObjectId;
    myId: mongoose.Types.ObjectId;
    friendId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const friendSchema = new mongoose.Schema<IFriend>(
    {
        myId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Profile",
        },
        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Profile",
        },
    },
    {
        timestamps: true,
    }
);

export const Friend = mongoose.models.friends || mongoose.model("Friend", friendSchema);