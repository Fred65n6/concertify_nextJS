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

    // Create a base token data object
    const tokenData: {
      id: string;
      username: string;
      email: string;
      isAdmin?: boolean;
      isArtist?: boolean;
      isVerified: boolean;
    } = {
      id: user._id,
      username: user.username,
      email: user.email.toLowerCase(),
      isVerified: true,
    };

    // Check user roles and update token data accordingly
    if (user.isAdmin) {
      tokenData.isAdmin = true;
    } else if (user.isArtist) {
      tokenData.isArtist = true;
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set the token in an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

