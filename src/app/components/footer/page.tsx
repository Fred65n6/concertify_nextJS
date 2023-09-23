import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <>
            <footer className=" pb-24 md:pb-0 border-t-2 border-purple-800 font-light w-full mt-40 px-4 xl:px-28">
                <div className="grid grid-cols-2 ">
                    <Image
                        src="../logo.svg"
                        width={150}
                        height={30}
                        className="py-5"
                        alt="logo"
                    />
                    <p className="col-start-1 col-span-2 md:col-span-1 text-left pb-10">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sapiente eos soluta exercitationem accusantium nostrum
                        cum voluptates, harum fugiat sed commodi ducimus
                        deserunt aliquid iure sequi vel quos odio explicabo
                        excepturi?
                    </p>
                </div>
                <div className="grid justify-center items-center md:flex gap-8  md:justify-between pb-6 ">
                    <div className="text-purple-800 flex ">
                        <img
                            src="../phone.svg"
                            className="phone_icon stroke-purple-800 pr-2"
                            alt="phone_icon"
                        />
                        <a href="tel:004528513171">310-437-2766</a>
                    </div>
                    <div className="text-purple-800 flex">
                        <img
                            src="../mail.svg"
                            className="phone_icon stroke-purple-800 pr-2"
                            alt="phone_icon"
                        />
                        <a href="tel:004528513171">help@concertify.com</a>
                    </div>
                    <div className="text-purple-800 flex">
                        <img
                            src="../location.svg"
                            className="phone_icon stroke-purple-800 pr-2"
                            alt="phone_icon"
                        />
                        <a href="tel:004528513171">
                            Meinungsgade 29, Nørrebro, Copenhagen Denmark
                        </a>
                    </div>
                </div>
                <section className="flex border-t-2 border-gray-300 justify-between pt-4">
                    <div className="grid md:flex gap-4">
                        <a href="#">About us</a>
                        <a href="#">Contact</a>
                        <a href="#">Account</a>
                        <a href="#">Privacy policy</a>
                        <a href="#">Terms of use</a>
                    </div>
                    <div>
                        <p>@ 2023, All Rights Reserved</p>
                    </div>
                </section>
            </footer>
        </>
    );
};

export default Footer;
