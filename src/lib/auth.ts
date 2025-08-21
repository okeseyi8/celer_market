import jwt from "jsonwebtoken"

import { NextRequest } from "next/server"




const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const TOKEN_EXPIRY = "1h";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
