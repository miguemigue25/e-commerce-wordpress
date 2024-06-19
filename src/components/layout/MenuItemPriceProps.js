import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import Down from "@/components/icons/Down";
import Up from "@/components/icons/Up";
import { useState } from "react";


export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {
    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        });
    }

    function editProp(e, index, prop) {
        const newValue = e.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove));
    }

    return (
        <div className="bg-gray-100 p-2 rounded-xl mb-2 border border-blue-300">
            <button
            onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex mb-1 p-1 bg-white"
                type="button"
            >
                {isOpen && (
                    <Up />
                )}
                {!isOpen && (
                    <Down />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div key={size.index} className="flex items-end gap-2">
                        <div>
                            <label className="hidden">Ingredient</label>
                            <input type="text"
                                placeholder="Ingredient"
                                value={size.name}
                                onChange={e => editProp(e, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text"
                                placeholder="Extra Price"
                                value={size.price}
                                onChange={e => editProp(e, index, 'price')}
                            />
                        </div>
                        <div>
                            <button type="button"
                                onClick={() => removeProp(index)}
                                className="bg-white mb-2 px-2"
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button className="bg-white items-center" type="button" onClick={addProp}>
                    <Plus className="w-4 h-4" />
                    <span>{addLabel}</span>
                </button>
            </div>

        </div>
    );
}