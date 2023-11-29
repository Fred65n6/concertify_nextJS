// import { getDataFromToken } from "@/helpers/getDataFromToken";
// import User from "@/models/userModel";
// import { connect } from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";

// export const middleware = async (request: NextRequest, response: NextResponse) => {
//   const path = request.nextUrl.pathname;

//   try {
//     connect();
//     const isRestrictedPath = path === "/favourites" || path === "/admin-dashboard";

//     const userId = await getDataFromToken(request);
//     const user = await User.findOne({ _id: userId }).select("isAdmin");

//     if (user && user.isAdmin) {
//       // User is an admin, allow access to the admin-dashboard
//       return response;
//     } else if (isRestrictedPath) {
//       // User is not an admin and trying to access a restricted path, deny access
//       return NextResponse.redirect(new URL("/", request.nextUrl));
//     }

//     // If the path is not restricted and user is not admin, continue processing the request
//     return response;
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// };

// export const config = {
//   matcher: ["/", "/login", "/signup", "/favourites", "/admin-dashboard"],
// };

