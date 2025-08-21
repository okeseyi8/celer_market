import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import { User } from "@/models/user";

async function fetchAvailableIds(): Promise<string[]> {
  try {
    const res = await fetch("http://127.0.0.1:8000/user_ids");
    if (!res.ok) throw new Error("Failed to fetch IDs");
    return await res.json();
  } catch (err) {
    console.error("Error fetching IDs:", err);
    return [];
  }
}

function getRandomId(ids: string[]): string | null {
  if (ids.length === 0) return null;
  return ids[Math.floor(Math.random() * ids.length)];
}

export async function POST(req: Request) {
  console.log("=== Incoming request to /api/register ===");

  try {
    const { name, email, password, confirmPassword } = await req.json();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    await connectDB();

    if (await User.findOne({ email })) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const response = await fetchAvailableIds();
    const allIds = (response as any)?.user_ids;

    const assignedIds = await User.find().distinct("mlUserId");
    const availableIds = allIds.filter((id: string) => !assignedIds.includes(id));

    if (!availableIds.length) {
      return NextResponse.json({ error: "No IDs available" }, { status: 400 });
    }

    const mlUserId = getRandomId(availableIds);
    if (!mlUserId) {
      return NextResponse.json({ error: "Unable to assign ID" }, { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword, mlUserId });

    // 🔹 Create JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, mlUserId: newUser.mlUserId },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "User registered successfully",
      token, // send token to client
      user: {
        id: newUser._id,
        mlUserId: newUser.mlUserId,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
