import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: true,
    },
    isArtist: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    favourites: [
        {
            favourite_concert_id: String,
            favourite_concert_image: String,
            favourite_concert_name: String,
            favourite_concert_date: String,
            favourite_concert_artist: String,
            favourite_concert_venue: String,
        },
    ],
    genres: [
        {
            genre_name: String,
            genre_id: String,
        },
    ],
    concerts: [
        {
            concert_id: String,
            concert_name: String,
            concert_image: String,
            concert_venue: [
                {
                    venue_name: String,
                    venue_id: String,
                }
            ],
            concert_date: String,
            concert_start: String,
            concert_artist_image: String,
            concert_artist_email: String,
        }
    ],
    artist: [
        {   
            artist_id: String,
            artist_email: String,
            artist_description: String,
            artist_name: String,
            artist_genre: [
                {
                genre_name: String,
                genre_id: String,
            },
            ],
            artist_image: String,
            artist_nation: String,
            artist_full_name: String,
            artist_dob: String,
        },
    ],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
