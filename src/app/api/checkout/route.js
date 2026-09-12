import { getUserFromToken } from "@/utils/common";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const POST = async (req) => {
    try {
        const user = getUserFromToken(req);
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1
            }],
            success_url: `${process.env.APP_URL}/dashboard?upgrade=success`,
            cancel_url: `${process.env.APP_URL}/dashboard?upgrade=cancelled`,
            client_reference_id: user.id,
            customer_email: user.email
        })

        return NextResponse.json({url: session.url},{status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message},{status: 500});
    }
}