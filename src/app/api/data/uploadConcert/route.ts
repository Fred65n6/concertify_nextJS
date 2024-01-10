import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Concert from "@/models/concertModel";
import { Storage } from "@google-cloud/storage";
import User from "@/models/userModel";

// -- Load AWS credentials and configuration from environment variables
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  },
});

const generateUUID = () => {
  const uuid = uuidv4();
  return uuid.replace(/-/g, "");
};

export async function POST(request: NextRequest) {
  const cspHeader = "default-src 'self'; script-src 'self'; style-src 'self';";
  const data = await request.formData();
  const file = data.get("file") as File;
  const concertId = generateUUID();
  const concertName = (data.get("Concert_name")as string);
  const concertDate = data.get("Concert_date");
  const concertStart = data.get("Concert_start");
  const concertDoors = data.get("Concert_doors");
  const concertArtistEmail = (data.get("Concert_artist_email")as string);
  const concertDescription = (data.get("Concert_description")as string);
  const isVisible = data.get("isVisible"); // Added line to get isVisible

  const concertGenre = {
    genre_name: data.get("Concert_genre_name"),
    genre_id: data.get("Concert_genre_id"),
  };

  const concertArtist = {
    artist_name: data.get("Concert_artist_name"),
    artist_id: data.get("Concert_artist_id"),
  };

  const concertVenue = {
    venue_name: data.get("Concert_venue_name"),
    venue_id: data.get("Concert_venue_id"),
  };

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedFileTypes.includes(file.type)) {
    return NextResponse.json({
      success: false,
      error: "Invalid file type. Only PNG, JPEG, and JPG files are allowed.",
    });
  }

  const normalCharsRegex = /^[a-zA-Z0-9æøåÆØÅ!@#$%^&*()_+-{}\[\]:;<>,.?~\s]+$/;


  if (concertName) {
    if (concertName.length > 40 || !normalCharsRegex.test(concertName)) {
      return NextResponse.json({
        success: false,
        error: "Concert name must be at most 140 characters long and can only contain normal characters.",
      });
    }
  }

  if (concertDescription) {
    if (concertDescription.length > 300 || !normalCharsRegex.test(concertDescription)) {
      return NextResponse.json({
        success: false,
        error: "Concert description must be at most 300 characters long and can only contain normal characters.",
      });
    }
  }

  const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bucketName = "concertify";
    const uuid = generateUUID();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const gcsFileName = `concert_images/${newFileName}`;
    const bucket = storage.bucket(bucketName);
    const fileOptions = {
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    };

  try {
    const fileBuffer = await file.arrayBuffer();
      const fileData = Buffer.from(fileBuffer);

      await bucket.file(gcsFileName).save(fileData, {
        metadata: fileOptions.metadata,
      });

      console.log(`File uploaded to GCS: ${gcsFileName}`);

      const concertImage = `${gcsFileName}`

    let newConcert;

if (concertArtistEmail) {
  newConcert = new Concert({
    concert_id: concertId,
    concert_name: concertName,
    concer_date: concertDate,
    concert_start: concertStart,
    concert_doors: concertDoors,
    concert_image: concertImage,
    concert_date: concertDate,
    concert_description: concertDescription,
    concert_genre: concertGenre,
    concert_artist: concertArtist,
    concert_venue: concertVenue,
    concert_artist_email: concertArtistEmail.toLowerCase(),
    isVisible: isVisible === "true", // Convert string to boolean
  });
} else {
  newConcert = new Concert({
    concert_id: concertId,
    concert_name: concertName,
    concer_date: concertDate,
    concert_start: concertStart,
    concert_doors: concertDoors,
    concert_image: concertImage,
    concert_date: concertDate,
    concert_description: concertDescription,
    concert_genre: concertGenre,
    concert_artist: concertArtist,
    concert_venue: concertVenue,
    isVisible: isVisible === "true", // Convert string to boolean
  });
}

    const savedConcert = await newConcert.save();
    console.log(savedConcert);

    if (concertArtistEmail) {
      const user = await User.findOne({ email: concertArtistEmail });
      console.log(user);

      const newConcert = {
        concert_id: concertId,
        concert_name: concertName,
        concert_artist: concertArtist,
        concert_image: concertImage,
        concert_description: concertDescription,
        concert_date: concertDate,
        concert_venue: concertVenue,
        concert_start: concertStart,
        concert_artist_image: concertImage,
        concert_artist_email: concertArtistEmail,
        isVisible: isVisible === "true",
      };
      
      user.concerts.push(newConcert);
      await user.save();
    }
    return new NextResponse(JSON.stringify({ success: true }), {
      headers: {
          'Content-Type': 'application/json',
          'Content-Security-Policy': cspHeader,
          'Cache-Control': 'no-cache, max-age=0',
      },
  });
  } catch (error) {
    console.error("CSP-header error:", error);
    return new NextResponse(JSON.stringify({ success: false }), {
            headers: {
                'Content-Type': 'application/json',
                'Content-Security-Policy': cspHeader,
            },
        });
}
}
