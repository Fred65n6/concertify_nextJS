import {NextRequest} from "next/server";

export const getGenreData = (request: NextRequest) => {
    try {
        const genre = request.cookies.getAll("genres");
        return genre.values;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
