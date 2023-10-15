import {writeFile} from "fs/promises";
import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Venue from "@/models/venueModel";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as File;
    const venueName = data.get("Venue_name");
    const venueAddress = data.get("Venue_address");

    if (!file) {
        return NextResponse.json({success: false});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uuid = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const path = `public/venue_images/${newFileName}`;

    // Writing the file to the filesystem
    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);

    const image = `artist_images/${newFileName}`;

    const newVenue = new Venue({
        venue_name: venueName,
        venue_image: image,
        venue_address: venueAddress,
    });

    const savedVenue = await newVenue.save();
    console.log(savedVenue);

    // You can now use concertArtist and concertName for further processing, e.g., saving them to a database.

    return NextResponse.json({success: true});
}
