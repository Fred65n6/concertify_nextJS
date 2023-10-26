"use client";
import React, {ReactNode, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

const BreadcrumbComp = () => {
    const [config] = useState({
        homeElement: "Home",
        separator: " / ",
        containerClasses: "",
        listClasses: "",
        activeClasses: "active",
        capitalizeLinks: true,
    });

    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);

    return (
        <div className="flex">
            <ul className="flex py-5 brand_purple opacity-70 gap-2">
                <li className="">
                    <Link href={"/"}>{config.homeElement}</Link>
                </li>
                {pathNames.length > 0 && config.separator}
                {pathNames.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join("/")}`;
                    // let itemClasses =
                    //     paths === href
                    //         ? `${config.listClasses} ${config.activeClasses}`
                    //         : config.listClasses;
                    let itemLink = config.capitalizeLinks
                        ? link[0].toUpperCase() + link.slice(1, link.length)
                        : link;
                    return (
                        <React.Fragment key={index}>
                            <li>
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && config.separator}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

export default BreadcrumbComp;
