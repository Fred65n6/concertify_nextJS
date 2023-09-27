import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {newpassword, email, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                {error: "Invalid password"},
                {status: 400}
            );
        }
        console.log(user);

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        console.log(user);

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newpassword, salt);

        const newPassword = new User({
            password: hashedPassword,
        });
        await user.save();

        return NextResponse.json({
            message: "new password set",
            success: true,
        });
        console.log("password updated");
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
