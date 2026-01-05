  import { NextRequest } from "next/server";
  import jwt, { JwtPayload } from "jsonwebtoken";
  import { permissionModel } from "@/models/permission.model";
  import { menuModel } from "@/models/menu.model";
  import "@/models"; // 🔥 ensure associations are registered

  if (!process.env.ACCESS_JWT_SECRET) {
    throw new Error("ACCESS_JWT_SECRET is not defined");
  }

  const jwtSecret = process.env.ACCESS_JWT_SECRET;

  type AuthUser = JwtPayload & {
    id: number;
    role: string;
    name: string | null;
    email: string;
  };

  type AuthSuccess = {
    valid: true;
    user: AuthUser;
  };

  type AuthFailure = {
    valid: false;
    message: string;
    status: number;
    user: AuthUser|null;
  };

  type AuthResult = AuthSuccess | AuthFailure;

  export async function getDecodedToken(req: NextRequest): Promise<AuthResult> {
    try {
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

      if (!token)
        return { valid: false, message: "Access token missing", status: 402 ,user:null};

      const decoded = jwt.verify(token, jwtSecret) as AuthUser;

      return { valid: true, user: decoded };
    } catch {
      return {
        valid: false,
        message: "Invalid or expired token",
        status: 401,
        user: null,
      };
    }
  }

  export async function validateToken(req: NextRequest) {
    return getDecodedToken(req);
  }

  export async function verifyAdmin(req: NextRequest, action: string) {
    try {
      const result = await getDecodedToken(req);
      // console.log("result", result);
      if (!result.valid) return result;

      if(result.user.role == "admin") return result;
      if(action){
        // console.log("actionactionactionactionactionaction", action);
        const hasPermission = await permissionModel.findOne({
          where: { userId: Number(result.user.id) },
          include: [
            {
              model: menuModel,
              where: { menuName: action },
              required: true,
              attributes: [],
            },
          ],
          attributes: ["id"],
        });
        // console.log("resultresultresultresultresultresult", hasPermission);

        if (!hasPermission) {
          return {
            valid: false,
            message: "Permission denied",
            status: 406,
            user: null,
          };
        }
      }


      return result;
    } catch {
      return {
        valid: false,
        message: "Invalid or expired token",
        status: 401,
        user: null,
      };
    }
  }


