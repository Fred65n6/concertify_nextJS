import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import Artist from "@/models/artistModel";
import { Storage } from "@google-cloud/storage";
import User from "@/models/userModel"


const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  },
});


const generateUUID = () => {
    const uuid = uuidv4();
    return uuid.replace(/-/g, '');
};

export async function POST(request: NextRequest) {
    const cspHeader = "default-src 'self'; script-src 'self'; style-src 'self';";
    const data = await request.formData();
    const file = data.get("file") as File;
    const artistId = generateUUID();
    const artistName = (data.get("artist_name")as string);
    const artistFullName = (data.get("artist_full_name")as string);
    const artistNationality = (data.get("artist_nation")as string);
    const artistDescription = (data.get("artist_description")as string);
    const artistDob = data.get("artist_dob");
    const artistEmail = (data.get("artist_email") as string);

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
    
    const normalCharsRegex = /^[a-zA-Z0-9æøåÆØÅ!@#$%^&*()_+-{}\[\]:;<>,.?~\s]+$/;



  if (artistName) {
    if (artistName.length > 60 || !normalCharsRegex.test(artistName)) {
      return NextResponse.json({
        success: false,
        error: "Max length for artist name is 60 characters long, and can only contain normal characters.",
      });
    }
  }
  

  if (artistFullName) {
    if (artistFullName.length > 60 || !normalCharsRegex.test(artistFullName)) {
      return NextResponse.json({
        success: false,
        error: "Max length for artist full name is 60 characters long, and can only contain normal characters.",
      });
    }
  }


  if (artistDescription) {
    if (artistDescription.length > 800 || !normalCharsRegex.test(artistDescription)) {
      return NextResponse.json({
        success: false,
        error: "Max length for artist description is 800 characters long, and can only contain normal characters.",
      });
    }
  }
  

  if (artistNationality) {
    if (artistNationality.length > 2 || !normalCharsRegex.test(artistNationality)) {
      return NextResponse.json({
        success: false,
        error: "Max length for artist full name is 2 characters long, and can only contain normal characters.",
      });
    }
  }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bucketName = "concertify";
    const uuid = generateUUID();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;
    const gcsFileName = `artist_images/${newFileName}`;
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

      const artistImage = `${gcsFileName}`

        let newArtist;

        if (artistEmail) {
          newArtist = new Artist({
            artist_id: artistId,
            artist_name: artistName,
            artist_full_name: artistFullName,
            artist_description: artistDescription,
            artist_nation: artistNationality,
            artist_image: artistImage,
            artist_genre: artistGenre,
            artist_dob: artistDob,
            artist_email: artistEmail.toLowerCase(),
          });
        } else {
          newArtist = new Artist({
            artist_id: artistId,
            artist_name: artistName,
            artist_full_name: artistFullName,
            artist_description: artistDescription,
            artist_nation: artistNationality,
            artist_image: artistImage,
            artist_genre: artistGenre,
            artist_dob: artistDob,
        });
      }

        if (artistEmail) {
          try {
            const user = await User.findOne({email: artistEmail});
  
            const newArtist = {
                artist_id: artistId,
                artist_name: artistName,
                artist_full_name: artistFullName,
                artist_description: artistDescription,
                artist_nation: artistNationality,
                artist_image: artistImage,
                artist_genre: artistGenre,
                artist_dob: artistDob,
                artist_email: artistEmail.toLowerCase()
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