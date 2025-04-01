import connectDB  from "@/lib/db";
import { User } from "@/models/users.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    
  await connectDB();
  try {
    const { email, name, password } = await req.json();

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
        return NextResponse.json(
            {
              success: false,
              message: "Account already exsists from this email",
            },
            { status: 400 }
          );
    } 
    else {
      const hashedPassword = await bcrypt.hash(password, 15);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Signup Completed Successfully. Please login your account",
      },
      { status: 200 }
    );
  } catch (error : any) {
    return NextResponse.json(
      {
        success : false,
        message : "Error signing up user"
      },
      { status : 500}
    )
  }
}