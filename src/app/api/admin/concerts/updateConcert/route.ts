import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import Concert from "@/models/concertModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {newConcertName, id} = reqBody;
        console.log(reqBody);

        const concert = await Concert.findOne({id});

        // const usernameExists = await User.findOne({newUsername});
        // if (usernameExists) {
        //     return NextResponse.json(
        //         {error: "Username is already taken"},
        //         {status: 400}
        //     );
        // }

        concert.concert_name = newConcertName;
        await concert.save();

        return NextResponse.json({
            message: "New concert name set",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
