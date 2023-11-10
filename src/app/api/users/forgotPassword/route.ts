import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";
import {NextApiRequest, NextApiResponse} from "next";

connect();

export default async function forgotPassword(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Method Not Allowed", status: 405});
    }

    try {
        const {email} = req.body;

        console.log(req.body);

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
