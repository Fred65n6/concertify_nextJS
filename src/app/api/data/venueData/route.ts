import { NextRequest, NextResponse } from "next/server";
import Venue from "@/models/venueModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function getServerSideProps() {
  return {
    props: {},
    headers: {
      // Add your headers for API routes here
      "X-Frame-Options": "DENY",
      "Content-Security-Policy":
        "default-src 'self' https://concertify.netlify.app;",
      // Add other headers as needed
    },
  };
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const venue = await Venue.find();

    return NextResponse.json({
      message: "Array of all venues found:",
      success: true,
      data: venue,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
