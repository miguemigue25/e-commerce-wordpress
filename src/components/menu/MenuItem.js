import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MenuItem(MenuItem) {
    const { image, name, description, basePrice, sides, drinks, extraIngredientPrices } = MenuItem;
    const { addToCart } = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSide, setSelectedSides] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(drinks?.[0] || null);

    function handleAddToCartButtonClick() {
        if (sides.length === 0 && extraIngredientPrices.length === 0) {
            addToCart(MenuItem);
            toast.success('Added to cart!');
        } else {
            setShowPopup(true);
        }
    }

    function handleSideClick(e, side) {
        const checked = e.target.checked;
        if (checked) {
            setSelectedSides(prev => [...prev, side]);
        } else {
            setSelectedSides(prev => {
                return prev.filter(e => e.name !== side.name);
            })
        }
    }

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div className="bg-white my-8 p-2 rounded-lg max-w-md">
                        <div className="p-2 overflow-y-scroll" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image
                                src={image} alt={name}
                                width={300} height={200}
                                className="mx-auto rounded-lg mb-2" />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-sm text-gray-700 mb-2">
                                {description}
                            </p>
                            {sides?.length > 0 && (
                                <div className="text-center p-2 mb-2">
                                    <h3 className=" font-thin">Pick a side</h3>
                                    {sides.map(side => (
                                        <label key={side._id} className="flex items-center px-5 gap-2 p-3 mb-1 border rounded-md">
                                            <input
                                                type="checkbox"
                                                name="side"
                                                onChange={() => handleSideClick(side)}
                                                checked={selectedSide.map(e => e._id).includes(side._id)} />
                                            {side.name} ${side.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {drinks?.length > 0 && (
                                <div className="text-center mb-2">
                                    <h3 className=" font-thin
                                ">Pick a drink</h3>
                                    {drinks.map(drink => (
                                        <label key={drink._id} className="flex items-center px-5 gap-2 p-3 mb-1 border rounded-md">
                                            <input 
                                            type="radio" 
                                            name="drink" 
                                            onChange={() => setSelectedDrink(drink)} 
                                            checked={selectedDrink?.name === drink.name}/>
                                            {drink.name} ${drink.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button type="button">
                                Add to cart &quot;selected price&quot;
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...MenuItem} />
        </>
    )
}