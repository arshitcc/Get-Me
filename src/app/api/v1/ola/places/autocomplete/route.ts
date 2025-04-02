import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { searchText, location } = await req.json();
    if (!searchText.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Search text is required",
          error: "Search text is required",
          data: {},
        },
        { status: 400 }
      );
    }

    const response = await axios.get(
      `https://api.olamaps.io/places/v1/autocomplete?location=${location.lat},${location.lng}&input=${searchText}&api_key=${process.env.OLAMAPS_API_KEY}`
    );

    if (response.data.error_message.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Error",
          error: response.data.error_message,
          data: {},
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Search text is required",
        error: "",
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: "Something went wrong",
      data: {},
    }, { status: 500 });
  }
}
