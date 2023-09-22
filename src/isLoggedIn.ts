import {NextRequest} from "next/server";

export const isLoggedIn = (request: NextRequest) => {
    // Check if the 'cookies' property exists in the request object
    if (!request.cookies) {
        return false; // Return false if 'cookies' property is missing
    }

    const token = request.cookies.get("token")?.value || "";
    return !!token; // Return true if the user is logged in, otherwise return false
};
