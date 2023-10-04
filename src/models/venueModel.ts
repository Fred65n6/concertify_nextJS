import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
    venue_name: {
        type: String,
        required: [true, "please provode the venue_name"],
        unique: true,
    },
    venue_address: {
        type: String,
        required: [true, "please provode the venue_address"],
    }
});

const Venue = mongoose.models.venues || mongoose.model("venues", venueSchema);

export default Venue;
