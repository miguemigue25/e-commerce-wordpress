"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";


export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, zipCode, city, state } = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                zipCode,
                city,
                state
            };
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    let total = 0;
    for (const p of cartProducts) {
        total += cartProductPrice(p);
    }

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            <div className=" mt-4 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div className="flex items-center gap-4 mb-2 border-b py-2" key={index}>
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
                                            <div className="text-gray-500" key={side._id}>
                                                &nbsp;&nbsp;{side.name} ${side.price}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">
                                ${cartProductPrice(product)}
                            </div>
                            <div className="ml-2">
                                <button className="p-2"
                                    onClick={() => removeCartProduct(index)}
                                    type="button">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="py-2 text-right pr-16">
                        Total:
                        <span className="text-lg font-semibold pl-2">${total}</span>
                    </div>
                </div>
                <div className="border mt-2 text-center border-blue-500 rounded-xl bg-gray-100 p-4 max-h-[34vh]">
                    <h2>Checkout</h2>
                    <form className="mt-4">
                        <AddressInputs addressProps={address} setAddressProps={handleAddressChange} />
                        <button type="submit" className=" font-light bottom mt-2">
                            Pay ${total}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}