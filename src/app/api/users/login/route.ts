import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // -- Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });  

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists");

    // -- Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    // -- Check if the user is verified
    if (!user.isVerified) {
      console.log("user not verified");
      return NextResponse.json(
        { error: "Email is not verified" },
        { status: 400 }
      );
    }

    // Check if the user is an admin
    if (user.isAdmin) {
      // Create token data for admin users
      const tokenDataAdmin = {
        id: user._id,
        username: user.username,
        email: user.email.toLowerCase(),
        isAdmin: true, 
      };

      // Create and set the adminToken
      const adminToken = await jwt.sign(tokenDataAdmin, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "Admin login successful",
        success: true,
        isAdmin: true,
      });

      response.cookies.set("adminToken", adminToken, {
        httpOnly: false,
      });

      return response;
    }

    else if (user.isArtist) {
      // Create token data for admin users
      const tokenDataArtist = {
        id: user._id,
        username: user.username,
        email: user.email,
        isArtist: true, 
      };

      // Create and set the adminToken
      const artistToken = await jwt.sign(tokenDataArtist, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "Artist login successful",
        success: true,
        isArtist: true,
      });

      response.cookies.set("artistToken", artistToken, {
        httpOnly: false,
      });

      return response;
    }

    // If the user is not admin:
    else {
      // Create token data for normal users
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: false,
      };

      // Create and set the token for normal users
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "Login successful",
        success: true,
      });

      response.cookies.set("token", token, {
        httpOnly: false,
      });
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}