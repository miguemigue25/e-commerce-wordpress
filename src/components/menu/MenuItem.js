import { useContext } from "react";
import { CartContext } from "@/components/AppContext";

export default function MenuItem(MenuItem) {
    const { image, name, description, basePrice, sizes, extraIngredientPrices } = MenuItem;

    const { addToCart } = useContext(CartContext);

    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-green-800 hover:text-white hover:shadow-2xl hover:border-red hover:border-t-2 hover:shadow-black/80 transition-all">
            <div className="text-center">
                <img src={image} alt="" className="rounded-md max-h-auto max-h-26 block mx-auto" />
            </div>
            <h4 className="font-semibold uppercase text-lg my-2">{name}</h4>
            <p className=" text-black text-sm mb-2 line-clamp-3 hover:text-white">
                {description}
            </p>
            <button onClick={() => addToCart(MenuItem)}
                className="sticky bottom-2 bg-white text-black mt-4  rounded-full px-8 py-2 hover:text-black hover:border-2 hover:border-black">
                Add to cart ${basePrice}
            </button>
        </div>
    )
}