import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import axios from "axios";

export async function GET(req: NextRequest, context: any) {
    try {
        await connectDB();
        const { placeId } = await context.params;
        if(!placeId.trim() || !placeId.startsWith("ola-platform:") ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid place",
                    error: "Invalid place",
                    data: {},
                },
                { status: 400 }
            );
        }

        const response = await axios.get(`https://api.olamaps.io/places/v1/details/advanced?place_id=${placeId}&api_key=${process.env.OLAMAPS_API_KEY}`);

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
                message: "Place details",
                error: "",
                data: response.data,
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: error,
                data: {},
            },
            { status: 500 }
        )
    }
}