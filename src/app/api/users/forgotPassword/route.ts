import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email});

        if (user) {
            // Send verification email only if the user exists
            await sendEmail({email, emailType: "RESET", userId: user._id});
            console.log(user.user_id);
            return NextResponse.json({
                message: "Email send",
                success: true,
                userId: user.id,
            });
        }
    } catch (error: any) {
        return NextResponse.json({error: error.message}), {status: 500};
    }
}
