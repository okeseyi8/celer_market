// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import { User } from "@/models/user";

export async function POST(req: Request) {
  console.log("=== Incoming request to /api/login ===");

  try {
    const { email, password } = await req.json();

    // Validate
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Connect to DB
    await connectDB();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, mlUserId: user.mlUserId },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        mlUserId: user.mlUserId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
