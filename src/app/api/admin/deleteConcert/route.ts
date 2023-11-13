import {NextRequest, NextResponse} from "next/server";
import Concert from "@/models/concertModel";

export async function DELETE(request: NextRequest) {
    const data = await request.formData();
    const concertId = data.get("concert_id");

    if (!concertId) {
        return NextResponse.json(
            {success: false, error: "Missing required parameters"},
            {status: 400}
        );
    }

    try {
        const concert = await Concert.findOne({_id: concertId});

        if (!concert) {
            return NextResponse.json(
                {success: false, error: "concert not found"},
                {status: 404}
            );
        }

        // Find the index of the concert with the specified concert ID
        const concertIndex = concert.concerts.findIndex(
            (concert: any) =>
                concert.concert_id === concertId
        );

        if (concertIndex === -1) {
            return NextResponse.json(
                {success: false, error: "User not found"},
                {status: 404}
            );
        }

        // Remove the concert from the array
        concert.concerts.splice(concertIndex, 1);
        await concert.save();

        return NextResponse.json({
            success: true,
            message: "Concert deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            {success: false, error: "Error deleting concert"},
            {status: 500}
        );
    }
}
