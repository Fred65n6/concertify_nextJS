import "./globals.css";
import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import Nav_logged from "@/app/components/navLoggedIn/page";
import Nav_not_logged from "@/app/components/navNotLogged/page";
import {hasCookie} from "@/helpers/cookieHelper";
import Footer from "./components/footer/page";
import TopNav from "./components/topNav/page";
import BreadcrumbComp from "./components/breadCrumbs/page";

const plusJakartaSans = Plus_Jakarta_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Concertify",
    description: "Experience Copenhagen through live music",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    const showComponent = hasCookie("token");

    return (
        <html lang="en">
            <body>
                <div
                    className={`${plusJakartaSans.className} dark:bg-[#202124] dark:text-white`}
                >
                    {showComponent ? ( // Render your component here
                        <Nav_logged />
                    ) : (
                        <Nav_not_logged />
                    )}
                    <main className="max-w-[1300px] pt-8 m-auto px-8 lg:px-14 min-h-screen ">
                        <BreadcrumbComp
                            homeElement={"Home"}
                            separator={<span> | </span>}
                            containerClasses="flex py-5 brand_purple opacity-70"
                            listClasses="hover:underline mx-2 font-bold brand_purple opacity-70"
                            capitalizeLinks
                        />
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
