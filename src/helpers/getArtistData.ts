import {NextRequest} from "next/server";

export const getArtistData = (request: NextRequest) => {
    try {
        const artist = request.cookies.getAll("artists");
        return artist.values;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
