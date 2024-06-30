"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage() {
    const { clearCart } = useContext(CartContext);
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        if (typeof window.console !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
        if (id) {
            setLoadingOrder(true);
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false);
                });
            })
        }
    }, []);

    let total = 0;
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            total += cartProductPrice(product);
        }
    }

    return (
        <section className="max-w-2xl mx-auto text-center mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Your order" />
                <div className="mt-4 mb-8">
                    <p>Thanks for your order!</p>
                    <p>We will message you when the order is ready for pickup!</p>
                </div>
            </div>
            {loadingOrder && (
                <div>Loading Order...</div>
            )}
            {order && (
                <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product} />
                        ))}
                        <div className="text-right py-2">
                            Total: 
                            <span className="font-semibold inline-block w-8 mr-5">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div>
                        <div className="border border-blue-500 p-4 rounded-lg">
                            <AddressInputs disabled={true} addressProps={order} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}