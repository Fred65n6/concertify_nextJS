import {NextRequest} from "next/server";

export const getConcertData = (request: NextRequest) => {
    try {
        const concert = request.cookies.getAll("concerts");
        return concert.values;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
