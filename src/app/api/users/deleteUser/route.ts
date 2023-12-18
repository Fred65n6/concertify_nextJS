import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import Artist from "@/models/artistModel";
import Concert from "@/models/concertModel"

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const {_id, password, email} = reqBody;


    if (!_id || !password) {
        return NextResponse.json(
            { success: false, error: "Missing required parameters" },
            { status: 400 }
        );
    }

    try {

        const artist = await Artist.findOne({artist_email: email})

        const user = await User.findOne({ _id: _id });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        if (artist) {

            const concerts = await Concert.find({concert_artist_email: email})
        
            // Delete concerts where concert.artist.artist_name matches
            await Concert.deleteMany({ concert_artist_email: email });
        
            await artist.deleteOne();

            console.log(concerts)
        }

        const currentPassword = user.password;

        const userPasswordString = String(password);

        const passwordMatch = await bcryptjs.compare(userPasswordString, currentPassword);

        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, error: "Password not correct" },
                { status: 401 }
            );
        }

        await user.deleteOne(); 

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Error deleting user" },
            { status: 500 }
        );
    }
}

