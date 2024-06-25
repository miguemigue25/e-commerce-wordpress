export default function MenuItemTile({ onAddToCart, ...item }) {
    const { image, description, name, basePrice, sides, drinks } = item;
    const hasDrinksOrSides = sides?.length > 0 || drinks?.length > 0;

    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-green-800 hover:text-white hover:shadow-2xl hover:border-red hover:border-t-2 hover:shadow-black/80 transition-all">
            <div className="text-center">
                <img src={image} alt="" className="rounded-md max-h-auto max-h-26 block mx-auto" />
            </div>
            <h4 className="font-semibold uppercase text-lg my-2">{name}</h4>
            <p className=" text-black text-sm mb-2 line-clamp-3 hover:text-white">
                {description}
            </p>
            <button onClick={onAddToCart} type="button"
                className=" bg-white text-black mt-4 bottom-2 rounded-full px-8 py-2 hover:text-black hover:border-2 hover:border-black">
                    {hasDrinksOrSides ? (
                        <span className="font-light whitespace-nowrap">Add to cart (from ${basePrice.toFixed(2)})</span>
                    ) : (
                        <span className="font-light">Add to cart ${basePrice.toFixed(2)}</span>
                    )}
            </button>
        </div>
    );
}