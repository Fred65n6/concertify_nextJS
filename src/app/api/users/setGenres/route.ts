import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { setGenres } = reqBody;
    console.log(reqBody);

    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId });

    // hvad skal der stå i stedet for genre?
    user.genre = setGenres;
    await user.save();

    return NextResponse.json({
      message: "Genres set",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
