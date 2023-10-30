import { NextRequest, NextResponse } from "next/server";
import Favourite from "@/models/favouriteModel";

export async function DELETE(request: NextRequest) {
  const data = await request.formData();
  const favouriteUserId = data.get("Favourite_user_id");
  const favouriteConcertId = data.get("Favourite_concert_id");

  if (!favouriteUserId || !favouriteConcertId) {
    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    // Assuming you have a function in your model that finds and deletes the favorite
    const deletedFavourite = await Favourite.findOneAndDelete({
      favourite_user_id: favouriteUserId,
      favourite_concert_id: favouriteConcertId,
    });

    if (!deletedFavourite) {
      return NextResponse.json(
        { success: false, error: "Favorite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Favorite deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error deleting favorite" },
      { status: 500 }
    );
  }
}
