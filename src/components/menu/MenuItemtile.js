export default function MenuItemTile({ onAddToCart, ...item }) {
    const { image, description, name, basePrice, sides, drinks } = item;

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
                    {(sides?.length > 0 || drinks?.length > 0) ? (
                        <span>Add to cart (from ${basePrice})</span>
                    ) : (
                        <span>Add to cart ${basePrice}</span>
                    )}
            </button>
        </div>
    );
}