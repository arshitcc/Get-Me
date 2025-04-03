import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../../auth/[...nextauth]/options";
import { Profile } from "@/models/profiles.model";
import { Favourite } from "@/models/favourites.model";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(AuthOptions);
    if (!session || !session.user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { place_id } = await req.json();

    const userProfile = await Profile.findOne({ userId: session.user._id });

    if (!userProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await Favourite.create({
      profileId: userProfile._id,
      place_id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Favourite added successfully",
        data: {},
        error: "",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error",
        error: error,
        data: {},
      },
      { status: 500 }
    );
  }
}

export async function GET(){
    try {
        await connectDB();

        const session = await getServerSession();
        if (!session || !session.user._id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const profile = await Profile.findOne({ userId: session.user._id });
        if (!profile) {
            return NextResponse.json({ message: "Profile not found" }, { status: 404 });
        }

        const favourites = await Favourite.aggregate([
            {
                $match : {
                    profileId : new mongoose.Types.ObjectId(profile._id)
                }
            },
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Favourites fetched successfully",
                data: favourites,
                error: "",
            },
            { status: 200 }
        );
      
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error",
                error: error,
                data: {},
            },
            { status: 500 }
        );
    }
}