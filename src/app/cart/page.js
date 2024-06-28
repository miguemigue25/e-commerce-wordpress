"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";


export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed 😔')
            }
        }
    }, []);

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
    total = total.toFixed(2);

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    async function proceedToCheckout(e) {
        e.preventDefault();

        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts,
                }),
            }).then(async (response) => {
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                } else {
                    reject();
                }
            });
        });
        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong...Please try again later',
        })
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart" />
                <p className="mt-4">Your shopping cart is empty</p>
            </section>
        );
    }
    // console.log({cartProducts});

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
                        <CartProduct key={index}
                            product={product}
                            onRemove={removeCartProduct} />
                    ))}
                    <div className="py-2 text-right pr-16">
                        Total:
                        <span className="text-lg font-semibold pl-2">${total}</span>
                    </div>
                </div>
                <div className="border mt-2 text-center border-blue-500 rounded-xl bg-gray-100 p-4 max-h-[34vh]">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout} className="mt-4">
                        <AddressInputs
                            addressProps={address}
                            setAddressProps={handleAddressChange} />
                        <button type="submit" className=" font-light bottom mt-2">
                            Pay ${total}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}