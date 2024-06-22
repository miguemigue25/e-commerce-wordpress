"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import {CartContext} from "@/components/AppContext";

export default function Header() {
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    const {cartProducts} = useContext(CartContext);
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return (
        <header className="flex items-center justify-between">
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
                {status === 'authenticated' && (
                    <>
                        <Link className=" items-center" href={'/profile'}>
                        &nbsp;Hello {userName}!
                            </Link>
                        <button onClick={() => signOut()}
                            className="bg-primary rounded-full text-white px-2 py-2 font-light">
                            Logout
                        </button>
                    </>

                )}
                {status !== 'authenticated' && (
                    <>
                        <Link href={'/register'}>Register</Link>
                        <Link href={'/login'} className="bg-primary rounded-full text-white px-8 py-2">
                            Login
                        </Link>
                    </>
                )}
                {cartProducts?.length > 0 && (
                    <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
                )}
            </nav>
        </header>
    );
}