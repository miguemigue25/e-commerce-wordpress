"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
    const session = useSession();
    console.log(session);
    const status = session.status;

    return (
        <header className="flex items-center justify-between">
            <nav className="flex items-center gap-4 text-black font-semibold">
                <Link href={"/"} className="flex text-primary font-semibold text-3xl text-center">
                    CARNITA&apos;S<br />
                    <div className="flex items-center">
                        <span className="text-2xl">&nbsp;Mexican Restaurant</span>
                    </div>
                </Link>
                <Link href={'/'} className="hover:text-primary hover:text-xl">&nbsp;&nbsp;Home</Link>
                <Link href={''} className="hover:text-primary hover:text-xl">Menu</Link>
                <Link href={''} className="hover:text-primary hover:text-xl">About</Link>
                <Link href={''} className="hover:text-primary hover:text-xl">Contact</Link>
            </nav>
            <nav className="flex items-center gap-6">
                {status === 'authenticated' && (
                    <button onClick={() => signOut()}
                        className="bg-primary rounded-full text-white px-8 py-2">
                        Logout
                    </button>
                )}
                {status !== 'authenticated' && (
                    <>
                        <Link href={'/register'}>Register</Link>
                        <Link href={'/login'} className="bg-primary rounded-full text-white px-8 py-2">
                            Login
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}