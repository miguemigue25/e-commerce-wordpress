import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <Link href="" className="flex text-primary font-semibold text-3xl text-center">
                CARNITA&apos;S<br />
                <div>
                    <span className="text-2xl">&nbsp;Mexican Restaurant</span> 
                </div>
            </Link>
            <nav className="flex items-center gap-8 text-black font-semibold">
                <Link href={''}>Home</Link>
                <Link href={''}>Menu</Link>
                <Link href={''}>About</Link>
                <Link href={''}>Contact</Link>
                <Link href={''} className="bg-primary rounded-full text-white px-8 py-2">Login</Link>
            </nav>
        </header>
    );
}