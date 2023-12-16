import {writeFile} from "fs/promises";
import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Venue from "@/models/venueModel";
import AWS from "aws-sdk";

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
    const venueName = (data.get("Venue_name") as string);
    const venueAddress = (data.get("Venue_address") as string);
    const venueLocation = (data.get("Venue_location") as string);
    const venueSize = (data.get("Venue_size") as string);
    const venueDescription = (data.get("Venue_description") as string);

    if (!file) {
        return NextResponse.json({success: false});
    }

    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedFileTypes.includes(file.type)) {
        return NextResponse.json({
        success: false,
        error: "Invalid file type. Only PNG, JPEG, and JPG files are allowed.",
        });
    }

    const normalCharsRegex = /^[a-zA-Z0-9æøåÆØÅ!@#$%^&*()_+{}\[\]:;<>,.?~\s]+$/;
    const onlyIntegersRegex = /^[0-9]+$/;

    
    if (venueName) {
      if (venueName.length > 60 || !normalCharsRegex.test(venueName)) {
        return NextResponse.json({
          success: false,
          error: "Max length for venue name is 60 characters long, and can only contain normal characters.",
        });
      }
    }

    if (venueDescription) {
        if (venueDescription.length > 600 || !normalCharsRegex.test(venueDescription)) {
          return NextResponse.json({
            success: false,
            error: "Max length for venue description is 600 characters long, and can only contain normal characters.",
          });
        }
      }

      if (venueLocation) {
        if (venueLocation.length > 60 || !normalCharsRegex.test(venueLocation)) {
          return NextResponse.json({
            success: false,
            error: "Max length for venue location is 60 characters long, and can only contain normal characters.",
          });
        }
      }

      if (venueAddress) {
        if (venueAddress.length > 60 || !normalCharsRegex.test(venueAddress)) {
          return NextResponse.json({
            success: false,
            error: "Max length for venue address is 60 characters long, and can only contain normal characters.",
          });
        }
      }

      if (venueSize) {
        if (venueSize.length > 20 || !onlyIntegersRegex.test(venueSize)) {
          return NextResponse.json({
            success: false,
            error: "Max length for venue size is 20 characters long, and can only contain numbers from 0-9.",
          });
        }
      }
  

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uuid = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const s3BucketName = "concertify"; // Replace with your S3 bucket name
    const s3ObjectKey = `venue_images/${newFileName}`;

    const params = {
        Bucket: s3BucketName,
        Key: s3ObjectKey,
        Body: buffer,
    };

    try {
        await s3.upload(params).promise();
        console.log(`File uploaded to S3: ${s3ObjectKey}`);

        const venueImage = `venue_images/${newFileName}`;

        const newVenue = new Venue({
            venue_name: venueName,
            venue_image: venueImage,
            venue_address: venueAddress,
            venue_location: venueLocation,
            venue_size: venueSize,
            venue_description: venueDescription,
        });

        const savedVenue = await newVenue.save();
        console.log(savedVenue);

        return NextResponse.json({
          success: true,
          message: "Venue uploaded successfully"
        });
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        return NextResponse.json({success: false});
    }
}
