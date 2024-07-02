import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";

export default function CartProduct({ product, onRemove, index }) {
    return (
        <div className="flex items-center gap-4 mb-2 border-b py-2">
            <div className="max-w-20">
                <Image className="rounded-lg" width={200} height={200} src={product.image} alt={''} />
            </div>
            <div className="grow">
                <h3 className=" font-sans">
                    {product.name}
                </h3>
                {product.size && (
                    <div className="text-sm">
                        Drink: <span>{product.drink}</span>
                    </div>
                )}
                {product.sides?.length > 0 && (
                    <div className="text-sm">
                        Sides:
                        {product.sides.map(side => (
                            <div className="text-gray-500" key={side.name}>
                                &nbsp;&nbsp;{side.name} ${side.price.toFixed(2)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-lg font-semibold">
                ${cartProductPrice(product).toFixed(2)}
            </div>
            {!!onRemove && (
                <div className="ml-2">
                    <button className="p-2"
                        onClick={() => onRemove(index)}
                        type="button">
                        <Trash />
                    </button>
                </div>
            )}
        </div>
    );
}