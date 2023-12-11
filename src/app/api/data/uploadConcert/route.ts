import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Concert from "@/models/concertModel";
import AWS from "aws-sdk";
import User from "@/models/userModel";

// Load AWS credentials and configuration from environment variables
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const generateUUID = () => {
  const uuid = uuidv4();
  return uuid.replace(/-/g, "");
};

const s3 = new AWS.S3();

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const concertId = generateUUID();
  const concertName = (data.get("Concert_name")as string);
  const concertDate = data.get("Concert_date");
  const concertStart = data.get("Concert_start");
  const concertDoors = data.get("Concert_doors");
  const concertArtistEmail = (data.get("Concert_artist_email")as string).toLowerCase();;
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

  const normalCharsRegex = /^[a-zA-Z0-9æøåÆØÅ!@#$%^&*()_+{}\[\]:;<>,.?~\s]+$/;

  if (concertName) {
    if (concertName.length > 40 || !normalCharsRegex.test(concertName)) {
      return NextResponse.json({
        success: false,
        error: "Concert name must be at most 40 characters long and can only contain normal characters.",
      });
    }
  }

  if (concertDescription) {
    if (concertDescription.length > 140 || !normalCharsRegex.test(concertDescription)) {
      return NextResponse.json({
        success: false,
        error: "Concert name must be at most 140 characters long and can only contain normal characters.",
      });
    }
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uuid = uuidv4();
  const fileExtension = file.name.split(".").pop();
  const newFileName = `${uuid}.${fileExtension}`;
  const s3BucketName = "concertify"; // Replace with your S3 bucket name
  const s3ObjectKey = `concert_images/${newFileName}`;

  const params = {
    Bucket: s3BucketName,
    Key: s3ObjectKey,
    Body: buffer,
  };

  try {
    await s3.upload(params).promise();
    console.log(`File uploaded to S3: ${s3ObjectKey}`);

    const concertImage = `concert_images/${newFileName}`;

    const newConcert = new Concert({
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
      concert_artist_email: concertArtistEmail,
      isVisible: isVisible === "true", // Convert string to boolean
    });

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
      };
      user.concerts.push(newConcert);
      await user.save();
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return NextResponse.json({ success: false });
  }
}

