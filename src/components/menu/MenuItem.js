// import { useContext, useState } from "react";
// import { CartContext } from "@/components/AppContext";
// import MenuItemTile from "@/components/menu/MenuItemTile";
// import toast from "react-hot-toast";
// import Image from "next/image";

// export default function MenuItem(MenuItem) {
//     const { image, name, description, basePrice, sides, drinks, extraIngredientPrices } = MenuItem;
//     const { addToCart } = useContext(CartContext);
//     const [showPopup, setShowPopup] = useState(false);
//     const [selectedSide, setSelectedSides] = useState([]);
//     const [selectedDrink, setSelectedDrink] = useState(drinks?.[0] || null);

//     function handleAddToCartButtonClick() {
//         const hasOptions = drinks.length > 0 || sides.length > 0;
//         if (hasOptions && !showPopup) {
//             setShowPopup(true);
//             return;
//         }
//         addToCart(MenuItem, selectedDrink, selectedSide);
//         setShowPopup(false);
//         toast.success('Added to cart!');
//     }

//     function handleSideClick(e, side) {
//         const checked = e.target.checked;
//         if (checked) {
//             setSelectedSides(prev => [...prev, side]);
//         } else {
//             setSelectedSides(prev => {
//                 return prev.filter(e => e._id !== side._id);
//             })
//         }
//     }

//     let selectedPrice = basePrice;
//     if (selectedDrink) {
//         selectedPrice += selectedDrink.price;
//     }

//     if (selectedSide?.length > 0) {
//         for (const extra of selectedSide) {
//             selectedPrice += extra.price
//         }
//     }

//     return (
//         <>
//             {showPopup && (
//                 <div onClick={() => setShowPopup(false)}
//                     className="fixed inset-0 bg-black/80 flex items-center justify-center">
//                     <div onClick={e => e.stopPropagation()}
//                         className="bg-white my-8 p-2 rounded-lg max-w-md">
//                         <div className="p-2 overflow-y-scroll" style={{ maxHeight: 'calc(100vh - 100px)' }}>
//                             <Image
//                                 src={image} alt={name}
//                                 width={300} height={200}
//                                 className="mx-auto rounded-lg mb-2" />
//                             <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
//                             <p className="text-center text-sm text-gray-700 mb-2">
//                                 {description}
//                             </p>
//                             {drinks?.length > 0 && (
//                                 <div className="text-center mb-2">
//                                     <h3 className="font-thin uppercase">Pick a drink</h3>
//                                     {drinks.map(drink => (
//                                         <label key={drink._id} className="flex items-center px-5 gap-2 p-3 mb-1 border rounded-md">
//                                             <input
//                                                 type="radio"
//                                                 name="drink"
//                                                 onChange={() => setSelectedDrink(drink)}
//                                                 checked={selectedDrink?._id === drink._id} />
//                                             {drink.name} ${drink.price}
//                                         </label>
//                                     ))}
//                                 </div>
//                             )}
//                             {sides?.length > 0 && (
//                                 <div className="text-center p-2 mb-2">
//                                     <h3 className="uppercase font-thin">Any sides?</h3>
//                                     {sides.map(side => (
//                                         <label key={side._id} className="flex items-center px-5 gap-2 p-3 mb-1 border rounded-md">
//                                             <input
//                                                 type="checkbox"
//                                                 name="side"
//                                                 onChange={(e) => handleSideClick(e, side)}
//                                                 checked={selectedSide.map(e => e._id).includes(side._id)} />
//                                             {side.name} ${side.price}
//                                         </label>
//                                     ))}
//                                 </div>
//                             )}
//                             <button type="button"
//                                 onClick={handleAddToCartButtonClick}>
//                                 Add to cart ${selectedPrice}
//                             </button>
//                             <button className="mt-2 bg-red-600 text-white font-light" onClick={() => setShowPopup(false)}>
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...MenuItem} />
//         </>
//     )
// }


import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MenuItem(MenuItem) {
    const { image, name, description, basePrice, sides, drinks, extraIngredientPrices } = MenuItem;
    const { addToCart } = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSides, setSelectedSides] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(drinks?.[0] || null);

    function handleAddToCartButtonClick() {
        const hasOptions = drinks.length > 0 || sides.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        addToCart(MenuItem, selectedDrink, selectedSides);
        setShowPopup(false);
        toast.success('Added to cart!');
    }

    function handleSideClick(e, side) {
        const checked = e.target.checked;
        if (checked) {
            setSelectedSides(prev => [...prev, side]);
        } else {
            setSelectedSides(prev => prev.filter(s => s._id !== side._id));
        }
    }

    let selectedPrice = basePrice;
    if (selectedDrink) {
        selectedPrice += selectedDrink.price;
    }

    if (selectedSides?.length > 0) {
        for (const extra of selectedSides) {
            selectedPrice += extra.price;
        }
    }
    selectedPrice = selectedPrice.toFixed(2);

    return (
        <>
            {showPopup && (
                <div onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div onClick={e => e.stopPropagation()}
                        className="bg-white my-8 p-2 rounded-lg max-w-md">
                        <div className="p-2 overflow-y-scroll" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image
                                src={image} alt={name}
                                width={300} height={200}
                                className="mx-auto rounded-lg mb-2" />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-sm text-gray-700 mb-2">
                                {description}
                            </p>
                            {drinks?.length > 0 && (
                                <div className="text-center mb-2">
                                    <h3 className="font-thin uppercase">Pick a drink</h3>
                                    {drinks.map(drink => (
                                        <label key={drink._id} className="flex items-center px-5 gap-2 p-3 mb-1 border rounded-md">
                                            <input
                                                type="radio"
                                                name="drink"
                                                onChange={() => setSelectedDrink(drink)}
                                                checked={selectedDrink?._id === drink._id} />
                                            {drink.name} ${drink.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {sides?.length > 0 && (
                                <div className="text-center p-2 mb-2">
                                    <h3 className="uppercase font-thin">Any sides?</h3>
                                    {sides.map(side => (
                                        <label key={side._id} className="flex items-center px-5 gap-2 p-3 mb-1 border rounded-md">
                                            <input
                                                type="checkbox"
                                                name="side"
                                                onChange={(e) => handleSideClick(e, side)}
                                                checked={selectedSides.map(s => s._id).includes(side._id)} />
                                            {side.name} ${side.price.toFixed(2)}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button type="button"
                                onClick={handleAddToCartButtonClick}>
                                Add to cart ${selectedPrice}
                            </button>
                            <button className="mt-2 bg-red-600 text-white font-light" onClick={() => setShowPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...MenuItem} />
        </>
    )
}
