import Stripe from "stripe";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/utils/db";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const POST = async (req) => {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return NextResponse.json({ message: `Webhook signature verification failed: ${error.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.client_reference_id;

        await connectDB();
        await User.findByIdAndUpdate(userId, { plan: "pro" });
    }

    return NextResponse.json({ received: true }, { status: 200 });
};