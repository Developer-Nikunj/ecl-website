import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

if (!process.env.ACCESS_JWT_SECRET) {
  throw new Error("ACCESS_JWT_SECRET is not defined");
}

const jwtSecret = process.env.ACCESS_JWT_SECRET;


type AuthUser = JwtPayload & {
  userId: string;
  role: string;
  actions: string[];
};

type AuthSuccess = {
  valid: true;
  user: AuthUser;
};

type AuthFailure = {
  valid: false;
  message: string;
  status: number;
};

type AuthResult = AuthSuccess | AuthFailure;



export async function getDecodedToken(req: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token)
      return { valid: false, message: "Access token missing", status: 402 };

    const decoded = jwt.verify(token, jwtSecret) as AuthUser;

    return { valid: true, user: decoded };
  } catch {
    return { valid: false, message: "Invalid or expired token", status: 401 };
  }
}

export async function validateToken(req:NextRequest) {
  return getDecodedToken(req);
}

export async function verifyAdmin(req: NextRequest) {
  try {
    const result = await getDecodedToken(req);

     if (!result.valid) return result;

     if (result.user.role !== "admin") {
       return { valid: false, message: "Only Admin can access !!" ,status : 400 };
     }

     return result;
  } catch {
    return { valid: false, message: "Invalid or expired token", status: 401 };
  }
}

// will be change
export async function canUserPerformAction(req: NextRequest, action: string) {
  const result = await getDecodedToken(req);

  if (!result.valid) return result;

  if (!result.user.actions?.includes(action)) {
    return {
      valid: false,
      message: "You are not allowed to perform this action",
      status: 400,
    };
  }
  return result;
}
