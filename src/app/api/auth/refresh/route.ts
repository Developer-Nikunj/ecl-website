import { NextRequest, NextResponse } from "next/server";
import redis from "@/utils/redis/redis"
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { userModel } from "@/models/user.model";


export async function POST(request:NextRequest){
    const sessionId = request.cookies.get("sessionId");
    if (!sessionId) return NextResponse.json({}, { status: 401 });

    const storedRefresh = await redis.get(`refresh:${sessionId}`);
    if (!storedRefresh) return NextResponse.json({}, { status: 403 });

    const newRefresh = randomBytes(40).toString("hex");
    await redis.set(`refresh:${sessionId}`, newRefresh, "EX", 7 * 86400);

    const userId = await redis.get(`session:${sessionId}`);

    const existuser = await userModel.findOne({
        where:{
            id:userId
        },
        attributes:['id','name','email','role','actions']
    });

    const accessToken = jwt.sign(
      {
        id: existuser.id,
        name: existuser.name,
        email: existuser.email,
        role: existuser.role,
      },
      process.env.ACCESS_JWT_SECRET!,
      {
        expiresIn: "10m",
      }
    );  
    return NextResponse.json({ accessToken: accessToken });

}
