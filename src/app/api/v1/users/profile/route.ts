import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/models/users.model";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../../auth/[...nextauth]/options";
import { Profile } from "@/models/profiles.model";
import mongoose from "mongoose";

export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(AuthOptions);
        if (!session || !session.user._id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ _id: session.user._id });
        // const profile = await Profile.aggregate([
        //     {
        //         $match : {
        //             userId : new mongoose.Types.ObjectId(user._id)
        //         }
        //     },
        //     {
        //         $project : {
        //             password : 0
        //         }
        //     },
        //     {
        //         $lookup : {
        //             from : "friends",
        //             localField : "userId",
        //             foreignField : "myId",
        //             as : "friends",
        //             pipeline : [
        //                 {
        //                     $lookup : {
        //                         from : "profiles",
        //                         localField : "friendId",
        //                         foreignField : "userId",
        //                         as : "friend",
        //                         pipeline : [
        //                             {
        //                                 $project : {
        //                                     password : 0
        //                                 }
        //                             }
        //                         ]
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        // ]);

        const profile = await Profile.findOne({ userId : user._id }).select("-password");

        return NextResponse.json({ 
            success: true,
            message: "Success",
            error : "",
            data: profile,
         }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req : NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(AuthOptions);
        if (!session || !session.user._id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ _id: session.user._id });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const profile = await Profile.findOne({ userId: user._id });
        if (!profile) {
            return NextResponse.json({ message: "Profile not found" }, { status: 404 });
        }

        const data = await req.json();

        const updatedProfile = await Profile.findOneAndUpdate({ userId: user._id }, data, { new: true });
        if (!updatedProfile) {
            return NextResponse.json({ success : false, message: "Unable to update profile"}, { status: 500 });
        }

        return NextResponse.json({ 
            success: true,
            message: "Success",
            error : "",
            data: updatedProfile,
         }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success:false, message: "Internal Server Error" }, { status: 500 });
    }
}