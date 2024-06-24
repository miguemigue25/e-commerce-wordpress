"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(MenuItems => {
                setBestSellers(MenuItems.slice(-6));
            });
        });
    }, []);

    return (
        <section className="my-6">
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10 rounded-xl">
                    <Image src={'/green_salsa.png'} width={400} height={400} alt={''} />
                </div>
                <div className="absolute -top-[70px] right-0 -z-10 rounded-xl">
                    <Image src={'/red_salsa.png'} width={400} height={400} alt={''} />
                </div>
            </div>
            <div className="text-center mb-8">
                <SectionHeaders
                    subHeader={"Preview our"}
                    mainHeader={"Menu"}
                />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item} />
                ))}
            </div>
        </section>
    )
}