import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
    venue_name: {
        type: String,
        required: [true, "please provide the venue_name"],
        unique: true,
    },
    venue_address: {
        type: String,
        required: [true, "please provide the venue_address"],
    },
    venue_image: {
        type: String,
    },
});

const Venue = mongoose.models.venues || mongoose.model("venues", venueSchema);

export default Venue;
