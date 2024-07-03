import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero md:mt-4">
            <div className="py-8 md:py-12 text-center md:text-left">
                <h1 className="text-4xl font-semibold">
                    Everything<br />
                    is better<br />
                    with&nbsp; 
                    <span className="text-primary">Mexican Food</span>!
                </h1>
                <p className="my-4 text-gray-500">
                    Authentic mexican food just like grandma cooked it including with hints of love.
                </p>
                <div className="flex justify-center md:justify-start">
                    <Link href={'/menu'} className="bg-primary uppercase leading-10 text-white px-8 py-2 rounded-full max-w-[250px]">
                        Check Our Menu
                    </Link>
                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={"/Tacos.png"} alt="" layout={"fill"} objectFit={"contain"}/>
            </div>
        </section>
    )
}