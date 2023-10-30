import { NextRequest, NextResponse } from "next/server";
import Favourite from "@/models/favouriteModel";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const favouriteConcertId = data.get("Favourite_concert_id");
  const favouriteConcertImage = data.get("Favourite_concert_image");
  const favouriteConcertName = data.get("Favourite_concert_name");
  const favouriteConcertDate = data.get("Favourite_concert_date");
  const favouriteConcertArtist = data.get("Favourite_concert_artist");
  const favouriteConcertVenue = data.get("Favourite_concert_venue");
  const favouriteUserId = data.get("Favourite_user_id");

  console.log(favouriteUserId);

  const newFavourite = new Favourite({
    favourite_concert_id: favouriteConcertId,
    favourite_concert_image: favouriteConcertImage,
    favourite_concert_name: favouriteConcertName,
    favourite_concert_date: favouriteConcertDate,
    favourite_concert_artist: favouriteConcertArtist,
    favourite_concert_venue: favouriteConcertVenue,
    favourite_user_id: favouriteUserId,
  });

  const savedFavourite = await newFavourite.save();
  console.log(savedFavourite);
  console.log(favouriteUserId);

  // You can now use concertArtist and concertName for further processing, e.g., saving them to a database.

  return NextResponse.json({ success: true });
}
