import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      await User.create({
        email,
        password,
      });

      return NextResponse.json(
        { message: "User registered successfully" },
        { status: 201 } // 201 = Created
      );
    } else {
      return NextResponse.json(
        { error: "email already registered" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json(
      {
        error: "failed to register User",
      },
      {
        status: 500,
      }
    );
  }
}
