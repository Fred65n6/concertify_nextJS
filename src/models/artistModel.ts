import mongoose from "mongoose";


const artistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        unique: true,
        required: [true, "please provide the artist_name"],
    },
    // artist_description: {
    //     type: String,
    //     minLength: 6,
    //     description: "must be a string at least 8 characters long"
    // },
    artist_genre: {
        genre_name: String, 
        genre_id: String,
    },
    artist_image: {
        type: String,
    },
    artist_image: {
        type: String,
        required: [true],
    },
    artist_nation: {
        type: String,
    },
});

const Artist =
    mongoose.models.artists || mongoose.model("artists", artistSchema);

export default Artist;
