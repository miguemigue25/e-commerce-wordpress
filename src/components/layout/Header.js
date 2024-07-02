"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import Cart from "@/components/icons/Cart";
import Burger from "@/components/icons/Burger";


function AuthLinks({ status, userName }) {
    if (status === 'authenticated') {
        return (
            <>
                <Link className=" items-center" href={'/profile'}>
                    &nbsp;Hello {userName}!
                </Link>
                <button onClick={() => signOut()}
                    className="bg-primary rounded-full text-white px-2 py-2 font-light">
                    Logout
                </button>
            </>
        );
    }
    if (status !== 'authenticated') {
        return (
            <>
                <Link href={'/register'}>Register</Link>
                <Link href={'/login'} className="bg-primary rounded-full text-white px-8 py-2">
                    Login
                </Link>
            </>
        );
    }
}

export default function Header() {
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    const { cartProducts } = useContext(CartContext);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return (
        <header>
            <div className="flex items-center md:hidden justify-between">
                <Link href={"/"} className="flex text-primary font-semibold text-2xl md:text-3xl gap-2 items-center text-center">
                    CARNITA&apos;S<br />
                    <div className="flex flex-col text-xl text-primary items-center">
                        <span>&nbsp;Mexican</span>
                        <span>&nbsp;Restaurant</span>
                    </div>
                </Link>
                <div className="flex gap-8 items-center">
                    <Link href={'/cart'} className="relative">
                        <Cart />
                        {cartProducts?.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-2 rounded-full leading-3">
                                {cartProducts.length}
                            </span>
                        )}
                    </Link>
                    <button
                        className="p-1 border"
                        onClick={() => setMobileNavOpen(prev => !prev)}>
                        <Burger />
                    </button>
                </div>
            </div>
            {mobileNavOpen && (
                <div onClick={() => setMobileNavOpen(false)}
                    className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
                    <Link href={'/'} className="hover:text-primary hover:text-xl">Home</Link>
                    <Link href={'/menu'} className="hover:text-primary hover:text-xl">Menu</Link>
                    <Link href={'#about'} className="hover:text-primary hover:text-xl">About</Link>
                    <Link href={'#contact'} className="hover:text-primary hover:text-xl">Contact</Link>
                    <AuthLinks status={status} userName={userName} />
                </div>
            )}

            <div className="hidden md:flex items-center justify-between">
                <nav className="flex items-center gap-4 text-black font-medium">
                    <Link href={"/"} className="flex text-primary font-semibold text-3xl gap-2 items-center text-center">
                        CARNITA&apos;S<br />
                        <div className="flex flex-col text-xl text-primary items-center">
                            <span>&nbsp;Mexican</span>
                            <span>&nbsp;Restaurant</span>
                        </div>
                    </Link>
                    <Link href={'/'} className="hover:text-primary hover:text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home</Link>
                    <Link href={'/menu'} className="hover:text-primary hover:text-xl">Menu</Link>
                    <Link href={'#about'} className="hover:text-primary hover:text-xl">About</Link>
                    <Link href={'#contact'} className="hover:text-primary hover:text-xl">Contact</Link>
                </nav>
                <nav className="flex items-center gap-6">
                    <AuthLinks status={status} userName={userName} />
                    <Link href={'/cart'} className="relative">
                        <Cart />
                        {cartProducts?.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-2 rounded-full leading-3">
                                {cartProducts.length}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}