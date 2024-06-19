"use client";
import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        })
    }, []);

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'NOT AN ADMIN';
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button flex"
                    href={'/menu-items/new'}
                >
                    <span>Create new menu item</span>
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-4">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/' + item._id}
                            key={item._id}
                            className=" button mb-1 flex-col hover:border-2 hover:border-blue-500"
                        >
                            <div className="relative">
                                <Image
                                    className="rounded-md"
                                    src={item.image} alt={''} width={200} height={200} />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}