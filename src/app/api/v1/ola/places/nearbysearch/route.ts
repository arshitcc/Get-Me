import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import axios from "axios";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const {location, types} = await req.json();

        if(!location.lat || !location.lng) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Location is required",
                    error: "Location is required",
                    data: {},
                },
                { status: 400 }
            );
        }

        const mylocation = location.lat + "," + location.lng;

        const response = await axios.get(`https://api.olamaps.io/places/v1/nearbysearch/advanced?layers=venue&types=${types || ""}&location=${mylocation}&api_key=${process.env.OLAMAPS_API_KEY}`);

        if(response.data.error_message.trim()) {
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
                message: "Nearby places",
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
                error: "Something went wrong",
                data: {},
            },
            { status: 500 }
        );
    }
}