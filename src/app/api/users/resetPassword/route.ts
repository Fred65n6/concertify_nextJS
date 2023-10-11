import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {newPassword, token} = reqBody;

        // Find the user by the resetPasswordToken
        const user = await User.findOne({forgotPasswordToken: token});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(newPassword, saltRounds);

        // Update the user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save the updated user
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully!",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
