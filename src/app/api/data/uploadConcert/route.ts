import {writeFile} from "fs/promises";
import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Concert from "@/models/concertModel";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as File;
    const concertArtist = data.get("Concert_artist");
    const concertName = data.get("Concert_name");

    if (!file) {
        return NextResponse.json({success: false});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uuid = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const path = `public/concert_images/${newFileName}`;

    // Writing the file to the filesystem
    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);

    const image = `concert_images/${newFileName}`;

    const newConcert = new Concert({
        concert_name: concertName,
        concert_artist: concertArtist,
        concert_image: image,
    });

    const savedConcert = await newConcert.save();
    console.log(savedConcert);

    // You can now use concertArtist and concertName for further processing, e.g., saving them to a database.

    return NextResponse.json({success: true});
}
