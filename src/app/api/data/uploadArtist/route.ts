import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Artist from "@/models/artistModel";
import AWS from "aws-sdk";
import User from "@/models/userModel"

// -- Load AWS credentials and configuration from environment variables
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
});

const generateUUID = () => {
    const uuid = uuidv4();
    return uuid.replace(/-/g, '');
};

const s3 = new AWS.S3();

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as File;
    const artistId = generateUUID();
    const artistName = (data.get("artist_name")as string);
    const artistFullName = (data.get("artist_full_name")as string);
    const artistNationality = (data.get("artist_nation")as string);
    const artistDescription = (data.get("artist_description")as string);
    const artistDob = data.get("artist_dob");
    const artistEmail = (data.get("artist_email") as string).toLowerCase();

    const artistGenre = {
        genre_name: data.get("artist_genre_name"),
        genre_id: data.get("artist_genre_id"),
    };

    console.log(artistEmail, artistId, artistName, artistNationality)

    const existingArtist = await Artist.findOne({ artist_name: artistName });

    if (existingArtist) {
        return NextResponse.json({
            success: false,
            error: "Artist name is already taken. Choose a different name.",
        });
    }

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

  if (artistName) {
    if (artistName.length > 60 || !normalCharsRegex.test(artistName)) {
      return NextResponse.json({
        success: false,
        error: "Artist name must be at most 60 characters long and can only contain normal characters.",
      });
    }
  }
  

  if (artistFullName) {
    if (artistFullName.length > 60 || !normalCharsRegex.test(artistFullName)) {
      return NextResponse.json({
        success: false,
        error: "Artist full name name must be at most 60 characters long and can only contain normal characters.",
      });
    }
  }


  if (artistDescription) {
    if (artistDescription.length > 140 || !normalCharsRegex.test(artistDescription)) {
      return NextResponse.json({
        success: false,
        error: "Artist name must be at most 140 characters long and can only contain normal characters.",
      });
    }
  }
  

  if (artistNationality) {
    if (artistNationality.length > 2 || !normalCharsRegex.test(artistNationality)) {
      return NextResponse.json({
        success: false,
        error: "Artist nationality must be at most 2 characters long and can only contain normal characters.",
      });
    }
  }
  

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uuid = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const s3BucketName = "concertify";
    const s3ObjectKey = `artist_images/${newFileName}`;

    const params = {
        Bucket: s3BucketName,
        Key: s3ObjectKey,
        Body: buffer,
    };

    try {
        await s3.upload(params).promise();
        console.log(`File uploaded to S3: ${s3ObjectKey}`);

        const artistImage = `artist_images/${newFileName}`;

        const newArtist = new Artist({
            artist_id: artistId,
            artist_name: artistName,
            artist_full_name: artistFullName,
            artist_description: artistDescription,
            artist_nation: artistNationality,
            artist_image: artistImage,
            artist_genre: artistGenre,
            artist_dob: artistDob,
            artist_email: artistEmail,
        });

        if (artistEmail) {
          try {
            const user = await User.findOne({email: artistEmail});
            console.log('this is artist email:' +  artistEmail)
            console.log(user)
    
            const newArtist = {
                artist_id: artistId,
                artist_name: artistName,
                artist_full_name: artistFullName,
                artist_description: artistDescription,
                artist_nation: artistNationality,
                artist_image: artistImage,
                artist_genre: artistGenre,
                artist_dob: artistDob,
                artist_email: artistEmail
            }
            user.artist.push(newArtist);
            await user.save();
          } catch (error) {
            return NextResponse.json(
              { error: "Artist email doesn't match a user" },
              { status: 400 }
          );
          }
        }
    
        const savedArtist = await newArtist.save();
        console.log(savedArtist);

        return NextResponse.json({success: true});
    } catch (error) {
        console.error("Error uploading artist:", error);
        return NextResponse.json({
            success: false,
            error: "Error uploading artist.",
        });
    }
}