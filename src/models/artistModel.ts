import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        required: [true, "please provide the artist_name"],
        unique: true,
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
