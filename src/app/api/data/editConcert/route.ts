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
  const concertStart = data.get ("concert_start");
  const concertDoors = data.get ("concert_doors");
  const concertDate = data.get ("concert_date");

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

    if (concertId) {

      const concert = await Concert.findOne({ _id: concertId });

    //   const user = await User.findOne({ email: concertArtistEmail });

    //   if (user) {
    //     console.log("this is the user artist fetched from the artistEmail", user);
      
    //     const concertToUpdate = user.concerts.find((concert: { concert_name: string }) => concert.concert_name === concertName);

    //     if (concertToUpdate) {
    //         if (concertDescription) concertToUpdate.concert_description = concertDescription;
    //         if (concertDate) concertToUpdate.concert_date = concertDate;
    //         if (concertStart) concertToUpdate.concert_start = concertStart;
    //         if (concertDoors) concertToUpdate.concert_doors = concertDoors;
    //         if (concertImage) concertToUpdate.concert_image = concertImage;

    //         await user.save();
    //     }
    //   }
    
      if (concert) {
        console.log("this is the artist fetched from the id" + concert);
    
            if (concertName) concert.concert_name = concertName;
            if (concertDescription) concert.concert_description = concertDescription;
            if (concertDate) concert.concert_date = concertDate;
            if (concertStart) concert.concert_start = concertStart;
            if (concertDoors) concert.concert_doors = concertDoors;
            if (concertImage) concert.concert_image = concertImage;
      
        await concert.save();
  
      }

      return NextResponse.json({ success: true });
    

    // if (concertArtistEmail) {

    //   console.log("This is " + artistEmail)

    //   const artist = await Artist.findOne({ artist_name: artistName });

    //   const user = await User.findOne({ email: artistEmail });
    
    //   if (artist) {
    //     console.log("this is the artist fetched from the artistName", artist);

    //     if (artistFullName) artist.artist_full_name = artistFullName;
    //     if (artistDescription) artist.artist_description = artistDescription;
    //     if (artistNationality) artist.artist_nation = artistNationality;
    //     if (artistImage) artist.artist_image = artistImage;
    //     if (artistDob) artist.artist_dob = artistDob;
      
    //     await artist.save();
    //   }

    //   if (user) {
    //     console.log("this is the user artist fetched from the artistEmail", user);
      
    //     const artistToUpdate = user.artist[0]; // Assuming there is only one artist in the array
      
    //     if (artistToUpdate) {
    //       // Check if each field is present in the form data before updating
    //       if (artistFullName) artistToUpdate.artist_full_name = artistFullName;
    //       if (artistDescription) artistToUpdate.artist_description = artistDescription;
    //       if (artistNationality) artistToUpdate.artist_nation = artistNationality;
    //       if (artistImage) artistToUpdate.artist_image = artistImage;
    //       if (artistDob) artistToUpdate.artist_dob = artistDob;
      
    //       await user.save();
    //     }
    //   }
      
    // return NextResponse.json({ success: true });

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