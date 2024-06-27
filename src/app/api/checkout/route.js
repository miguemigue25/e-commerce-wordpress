import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "@/models/Order";
import { MenuItem } from "@/models/MenuItem";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const { cartProducts, address } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false,
    });

    const stripeLineItems = [];
    for (const cartProduct of cartProducts) {

        const productInfo = await MenuItem.findById(cartProduct._id)
        let productPrice = productInfo.basePrice;

        if (cartProduct.drink) {
            const drink = productInfo.drinks
                .find(drink => drink._id.toString() === cartProduct.drink._id.toString());
            productPrice += drink.price;
        }

        if (cartProduct.sides?.length > 0) {
            for (const cartProductSide of cartProduct.sides) {
                const productSides = productInfo.sides;
                const sideInfo = productSides
                    .find(side => side._id.toString() === cartProductSide._id.toString());
                productPrice += sideInfo.price;
            }
        }
        const productName = cartProduct.name;

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: productName,
                },
                unit_amount: productPrice * 100,
            },
        });
    }

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: { orderId: orderDoc._id.toString() },
        payment_intent_data: {
            metadata: { orderId: orderDoc._id.toString() },
        },
        shipping_options: [ //this whole list is not needed
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: { amount: 500, currency: 'USD' },
                },
            }
        ],
    });
    return Response.json(stripeSession.url);
}