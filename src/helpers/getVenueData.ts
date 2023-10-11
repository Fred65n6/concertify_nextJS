import {NextRequest} from "next/server";

export const getVenueData = (request: NextRequest) => {
    try {
        const venue = request.cookies.getAll("venues");
        return venue.values;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
