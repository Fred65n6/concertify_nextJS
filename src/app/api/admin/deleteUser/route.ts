import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

export async function DELETE(request: NextRequest) {
    const data = await request.formData();
    const userId = data.get("user_id");

    if (!userId) {
        return NextResponse.json(
            {success: false, error: "Missing required parameters"},
            {status: 400}
        );
    }

    try {
        const user = await User.findOne({_id: userId});

        if (!user) {
            return NextResponse.json(
                {success: false, error: "User not found"},
                {status: 404}
            );
        }

        // Find the index of the user with the specified user ID
        const userIndex = user.users.findIndex(
            (user: any) =>
                user.user_id === userId
        );

        if (userIndex === -1) {
            return NextResponse.json(
                {success: false, error: "User not found"},
                {status: 404}
            );
        }

        // Remove the favorite from the array
        user.users.splice(userIndex, 1);
        await user.save();

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            {success: false, error: "Error deleting user"},
            {status: 500}
        );
    }
}
