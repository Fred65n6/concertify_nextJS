import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import User from "@/models/userModel";

// Load AWS credentials and configuration from environment variables
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const artistName = data.get("artist_name");
  const artistFullName = data.get("artist_full_name");
  const artistNationality = data.get("artist_nation");
  const artistDescription = data.get("artist_description");
  const artistDob = data.get("artist_dob");
  const artistEmail = data.get("artist_email");

  try {
    let artistImage = "";

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uuid = uuidv4();
      const fileExtension = file.name.split(".").pop();
      const newFileName = `${uuid}.${fileExtension}`;
      const s3BucketName = "concertify"; // Replace with your S3 bucket name
      const s3ObjectKey = `artist_images/${newFileName}`;

      const params = {
        Bucket: s3BucketName,
        Key: s3ObjectKey,
        Body: buffer,
      };

      await s3.upload(params).promise();
      console.log(`File uploaded to S3: ${s3ObjectKey}`);

      artistImage = `artist_images/${newFileName}`;
    }

    const user = await User.findOne({ email: artistEmail });

    if (user) {
      console.log(user);

      const existingArtistIndex = user.artist.findIndex(
        (artist: any) => artist.artist_email === artistEmail
      );

      // Update the existing artist's information
      if (existingArtistIndex !== -1) {
        const existingArtist = user.artist[existingArtistIndex];
      
        // Check if each field is present in the form data before updating
        if (artistName) existingArtist.artist_name = artistName;
        if (artistFullName) existingArtist.artist_full_name = artistFullName;
        if (artistDescription) existingArtist.artist_description = artistDescription;
        if (artistNationality) existingArtist.artist_nation = artistNationality;
        if (artistImage) existingArtist.artist_image = artistImage;
        if (artistDob) existingArtist.artist_dob = artistDob;
      }

      await user.save();

      return NextResponse.json({ success: true });
    } else {
      // Handle the case where the user is not found
      console.error(`User with email ${artistEmail} not found`);
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return NextResponse.json({ success: false });
  }
}