import mongoose from "mongoose";

const concertSchema = new mongoose.Schema({
    concert_name: {
        type: String,
    },
    concert_artist: {
        type: String,
    },
    concert_venue: {
        type: String,
    },
    concert_image: {
        type: String,
    },
});

const Concert =
    mongoose.models.concerts || mongoose.model("concerts", concertSchema);

export default Concert;
