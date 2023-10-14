import {writeFile} from "fs/promises";
import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Artist from "@/models/artistModel";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as File;
    const artistName = data.get("Artist_name");

    if (!file) {
        return NextResponse.json({success: false});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uuid = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const path = `public/artist_images/${newFileName}`;

    // Writing the file to the filesystem
    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);

    const image = `artist_images/${newFileName}`;

    const newArtist = new Artist({
        artist_name: artistName,
        artist_image: image,
    });

    const savedArtist = await newArtist.save();
    console.log(savedArtist);

    // You can now use concertArtist and concertName for further processing, e.g., saving them to a database.

    return NextResponse.json({success: true});
}
