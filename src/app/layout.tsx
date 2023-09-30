import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Nav_logged from "@/app/components/navLoggedIn/page";
import Nav_not_logged from "@/app/components/navNotLogged/page";
import { hasCookie } from "@/helpers/cookieHelper";
import Footer from "./components/footer/page";
import TopNav from "./components/topNav/page";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showComponent = hasCookie("token");

  return (
    <html lang="en">
      <body>
        <div
          className={`${plusJakartaSans.className} dark:bg-[#121212] dark:text-white`}
        >
          <TopNav />
          {showComponent ? ( // Render your component here
            <Nav_logged />
          ) : (
            <Nav_not_logged />
          )}
          <main className="max-w-[1300px] pt-8 m-auto px-8 lg:px-14 min-h-screen ">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
