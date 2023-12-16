import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import User from "@/models/userModel";
import Artist from "@/models/artistModel";

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
  const artistId = data.get("artist_id");

  try {
    let artistImage = "";

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uuid = uuidv4();
      const fileExtension = file.name.split(".").pop();
      const newFileName = `${uuid}.${fileExtension}`;
      const s3BucketName = "concertify"; // Amazon S3 bucket name
      const s3ObjectKey = `artist_images/${newFileName}`;

      const params = {
        Bucket: s3BucketName,
        Key: s3ObjectKey,
        Body: buffer,
      };

      await s3.upload(params).promise();

      artistImage = `artist_images/${newFileName}`;
    }

    const artist = await Artist.findOne({ artist_id: artistId });

    if (artist) {
      console.log("this is the artist fetched from the id", artist);

      if (artistName) artist.artist_name = artistName;
      if (artistFullName) artist.artist_full_name = artistFullName;
      if (artistDescription) artist.artist_description = artistDescription;
      if (artistNationality) artist.artist_nation = artistNationality;
      if (artistImage) artist.artist_image = artistImage;
      if (artistDob) artist.artist_dob = artistDob;

      await artist.save();
    }

    if (artistEmail) {

    const user = await User.findOne({ email: artistEmail });

    if (user) {
      console.log("this is the user artist fetched from the artistEmail", user);

      const artistToUpdate = user.artist[0];

      if (artistToUpdate) {
        if (artistName) artistToUpdate.artist_name = artistName;
        if (artistFullName) artistToUpdate.artist_full_name = artistFullName;
        if (artistDescription) artistToUpdate.artist_description = artistDescription;
        if (artistNationality) artistToUpdate.artist_nation = artistNationality;
        if (artistImage) artistToUpdate.artist_image = artistImage;
        if (artistDob) artistToUpdate.artist_dob = artistDob;

        await user.save();
      }
    }
  }


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return NextResponse.json({ success: false });
  }
}

    

   