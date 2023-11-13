import {NextRequest, NextResponse} from "next/server";
import Venue from "@/models/venueModel";

export async function DELETE(request: NextRequest) {
    const data = await request.formData();
    const venueId = data.get("venue_id");

    if (!venueId) {
        return NextResponse.json(
            {success: false, error: "Missing required parameters"},
            {status: 400}
        );
    }

    try {
        const venue = await Venue.findOne({_id: venueId});

        if (!venue) {
            return NextResponse.json(
                {success: false, error: "venue not found"},
                {status: 404}
            );
        }

        // Find the index of the venue with the specified venue ID
        const venueIndex = venue.venues.findIndex(
            (venue: any) =>
                venue.venue_id === venueId
        );

        if (venueIndex === -1) {
            return NextResponse.json(
                {success: false, error: "User not found"},
                {status: 404}
            );
        }

        // Remove the venue from the array
        venue.venues.splice(venueIndex, 1);
        await venue.save();

        return NextResponse.json({
            success: true,
            message: "Venue deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            {success: false, error: "Error deleting venue"},
            {status: 500}
        );
    }
}
