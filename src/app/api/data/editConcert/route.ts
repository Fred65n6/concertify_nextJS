import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import User from "@/models/userModel";
import Concert from "@/models/concertModel";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const concertName = data.get("concert_name");
  const concertDescription = data.get("concert_description");
  const concertArtistEmail = data.get("concert_artist_email");
  const concertId = data.get("concert_id");
  const concertStart = data.get("concert_start");
  const concertDoors = data.get("concert_doors");
  const concertDate = data.get("concert_date");
  const isVisible = data.get("isVisible"); // Added line to get isVisible


  try {
    let concertImage = "";

    if (file) {
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

      await s3.upload(params).promise();

      concertImage = `concert_images/${newFileName}`;
    }

    const concert = await Concert.findOne({ concert_id: concertId });

    console.log(concert);

    if (concert) {
      if (concertName) concert.concert_name = concertName;
      if (concertDescription) concert.concert_description = concertDescription;
      if (concertDate) concert.concert_date = concertDate;
      if (concertStart) concert.concert_start = concertStart;
      if (concertDoors) concert.concert_doors = concertDoors;
      if (concertImage) concert.concert_image = concertImage;
      if (isVisible) concert.isVisible = isVisible;

      await concert.save();
    }

    if (concertArtistEmail) {
      const user = await User.findOne({ email: concertArtistEmail });

      if (user) {
        console.log("this is the user artist fetched from the artistEmail", user);

        console.log(concertId)

        const concertToUpdate = user.concerts.find(
          (concerts:any) => concerts.concert_id === concertId
        );

        if (concertToUpdate) {
          if (concertDescription) concertToUpdate.concert_description = concertDescription;
          if (concertDate) concertToUpdate.concert_date = concertDate;
          if (concertName) concertToUpdate.concert_name = concertName;
          if (concertStart) concertToUpdate.concert_start = concertStart;
          if (concertDoors) concertToUpdate.concert_doors = concertDoors;
          if (concertImage) concertToUpdate.concert_image = concertImage;
          if (isVisible) concert.isVisible = isVisible;

          await user.save();
        }
      }

      return NextResponse.json({ success: true });
    } else {
      // Handle the case where the user is not found
      console.error(`User with email ${concertArtistEmail} not found`);
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return NextResponse.json({ success: false });
  }
}
