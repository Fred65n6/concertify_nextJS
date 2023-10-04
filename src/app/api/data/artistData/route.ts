import {getArtistData} from "@/helpers/getArtistData";
import {NextRequest, NextResponse} from "next/server";
import Artist from "@/models/artistModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const artistId = await getArtistData(request);
        const artist = await Artist.find();

        return NextResponse.json({
            message: "Artist Found:",
            data: artist,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
