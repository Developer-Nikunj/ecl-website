import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const jwtSecret = process.env.JWT_SECRET;


type AuthResult =
  | { valid: true; user: JwtPayload & { role?: string } }
  | { valid: false; message: string };


export async function getDecodedToken(): Promise<AuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return { valid: false, message: "No token found" };

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload & {
      role?: string;
    };

    return { valid: true, user: decoded };
  } catch {
    return { valid: false, message: "Invalid or expired token" };
  }
}

export async function validateToken() {
  return getDecodedToken();
}


export async function verifyAdmin() {
  try {
    const result = await getDecodedToken();

    if (result?.user?.role !== "admin") {
      return { valid: false, message: "Only Admin can perform this action" };
    }

    return result;
  } catch {
    return { valid: false, message: "Invalid or expired token" };
  }
}
