import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";


export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sides, setSides] = useState(menuItem?.sides || []);
    const [drinks, setDrinks] = useState(menuItem?.drinks || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);


    return (
        <form onSubmit={e => onSubmit(e, { image, name, description, basePrice, sides, drinks, extraIngredientPrices })}
            className="mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-2"
                style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div>
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Item Name</label>
                    <input type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <label>Description</label>
                    <input type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <label>Base Price</label>
                    <input type="text"
                        value={basePrice}
                        onChange={e => setBasePrice(e.target.value)}
                    />
                    <MenuItemPriceProps name={'Extra ingredients'}
                        addLabel={'Add another ingredient'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices}
                    />
                    <MenuItemPriceProps name={'Sides'}
                        addLabel={'Add a side'}
                        props={sides}
                        setProps={setSides}
                    />
                    <MenuItemPriceProps name={'Drinks'}
                        addLabel={'Add a drink'}
                        props={drinks}
                        setProps={setDrinks}
                    />
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
}