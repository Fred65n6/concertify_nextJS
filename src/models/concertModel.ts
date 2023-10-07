import mongoose from "mongoose";

const concertSchema = new mongoose.Schema({
    
    concert_name: {
        type: String,
        required: [true, "please provode the venue_name"],
        unique: true,
    }
});

const Concert = mongoose.models.concerts || mongoose.model("concerts", concertSchema);

export default Concert;
