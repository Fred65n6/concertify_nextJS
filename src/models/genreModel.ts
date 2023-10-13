import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    genre_name: {
        type: String,
        required: [true, "please provide the genre_name"],
        unique: true,
    },
});

const Genre = mongoose.models.genres || mongoose.model("genres", genreSchema);

export default Genre;
