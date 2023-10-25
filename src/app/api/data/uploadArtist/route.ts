import {writeFile} from "fs/promises";
import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Artist from "@/models/artistModel";

export async function POST(request: NextRequest) {
    const data = await request.formData();

    const file = data.get("file") as File;
    const artistName = data.get("artist_name");
    const artistFullName = data.get("artist_full_name");
    const artistNationality = data.get("artist_nation");
    const artistDescription = data.get("artist_description");
    const artistDob = data.get("artist_dob");


    const artistGenre = {
        genre_name: data.get("artist_genre_name"),
        genre_id: data.get("artist_genre_id"),
    };


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

    const artistImage = `artist_images/${newFileName}`;

    const newArtist = new Artist({
        artist_name: artistName,
        artist_full_name: artistFullName,
        artist_description: artistDescription,
        artist_nation: artistNationality,
        artist_image: artistImage,
        artist_genre: artistGenre,
        artist_dob: artistDob,
    });

    const savedArtist = await newArtist.save();
    console.log(savedArtist);

    return NextResponse.json({success: true});
}
