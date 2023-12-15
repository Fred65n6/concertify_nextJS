import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const tokenNames = ["token", "adminToken", "artistToken"];
    
    for (const tokenName of tokenNames) {
      const token = request.cookies.get(tokenName)?.value || "";
      try {
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const userId = decodedToken.id; 
        return userId;
      } catch (error) {
      }
    }
3
    throw new Error("No valid token found");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
