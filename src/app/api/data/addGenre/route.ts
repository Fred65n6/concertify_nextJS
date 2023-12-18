// Import necessary modules and models
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

// Define a type for the selectedGenres array
interface SelectedGenre {
  genre_name: string;
  genre_id: string;
}

// Define the API endpoint handler
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON payload
    const data = await request.json();
    const { selectedGenres, email } = data;

    // Find the user based on their email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
      });
    }

    // Clear existing genres
    user.genres = [];

    // Add the new genres
    const genreObjects: SelectedGenre[] = selectedGenres.map(
      ({ genre_name, genre_id }: SelectedGenre) => ({
        genre_name,
        genre_id,
      })
    );

    user.genres.push(...genreObjects);

    // Save the updated user
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating genres:", error);
    return NextResponse.json({
      success: false,
      error: "Error updating genres",
    });
  }
}

