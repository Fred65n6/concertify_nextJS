import {getVenueData} from "@/helpers/getVenueData";
import {NextRequest, NextResponse} from "next/server";
<<<<<<< HEAD
import Venue from "@/models/venueModel";
=======
import Venue from "@/models/venueModels";
>>>>>>> full_text_search
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const venueId = await getVenueData(request);
        const venue = await Venue.find();

        return NextResponse.json({
            message: "Venue Found:",
            data: venue,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> full_text_search
