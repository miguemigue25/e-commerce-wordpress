"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice;
    if (cartProduct.drink) {
        price += cartProduct.drink.price;
    }
    if (cartProduct.sides?.length > 0) {
        for (const side of cartProduct.sides) {
            price += side.price;
        }
    }
    return price;
}

export function AppProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    function removeCartProduct(indexToRemove) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts
                .filter((v, index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        });
        toast.success('Product removed');
    }



    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    function addToCart(product, drink = null, sides = []) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product, drink, sides };
            const newProducts = [...prevProducts, cartProduct];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}