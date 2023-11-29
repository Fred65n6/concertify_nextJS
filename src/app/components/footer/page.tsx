import React from "react";
import Image from "next/image";
import {SlPhone, SlEnvolope, SlLocationPin} from "react-icons/sl";

const Footer = () => {
    return (
        <>
            <footer className="max-w-[1300px] flex flex-col md:flex-row justify-between items-start gap-4 pb-24 md:pb-12 font-light w-full px-4  md:px-8 lg:px-14 border-t-[1px] border-slate-200 dark:bt-[1px] dark:border-[#23124b] pt-8">
                <Image
                    src="../concertify_logo.svg"
                    width={150}
                    height={30}
                    className="py-5"
                    alt="logo"
                />
                    <div className="">
                        <p className="col-start-1 col-span-2 md:col-span-1 text-left pb-10 text-gray-600 dark:text-slate-400">
                            Concertify is connecting all music lovers with their favourite concerts, venues, and genres.
                        </p>
                        <div className="flex flex-col md:flex gap-4">
                            <div className="text-gray-600 dark:text-slate-400 flex gap-2 align-middle">
                                <SlPhone className="w-5 h-5" id="phone" />
                                <a href="tel:004528513171">123-456-7890</a>
                            </div>
                            <div className="text-gray-600 dark:text-slate-400  flex gap-2 align-baseline">
                                <SlEnvolope
                                    className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                                    id="mail"
                                />
                                <a href="mailto:help@concertify.com">
                                    help@concertify.com
                                </a>
                            </div>
                            <div className="text-gray-600 dark:text-slate-400  flex gap-2 align-middle">
                                <SlLocationPin
                                    className="stroke-gray-600 dark:stroke-slate-400 w-5 h-5"
                                    id="location"
                                />
                                <p>
                                    Meinungsgade 29, Nørrebro, Copenhagen
                                    Denmark
                                </p>
                            </div>
                        </div>
                    </div>
            </footer>
        </>
    );
};

export default Footer;
