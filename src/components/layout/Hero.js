import Image from "next/image";

export default function Hero() {
    return (
        <section className="hero mt-4">
            <div className="py-12">
                <h1 className="text-4xl font-semibold">
                    Everything<br />
                    is better<br />
                    with&nbsp; 
                    <span className="text-primary">Mexican Food</span>!
                </h1>
                <p className="my-4 text-gray-500">
                    Authentic mexican food just like grandma cooked it including with hints of love.
                </p>
                <div className="flex ">
                    <button className="bg-primary uppercase leading-10 text-white px-8 py-2 rounded-full">
                        Check Our Menu
                    </button>
                </div>
            </div>
            <div className="relative">
                <Image src={"/Tacos.png"} alt="" layout={"fill"} objectFit={"contain"}/>
            </div>
        </section>
    )
}