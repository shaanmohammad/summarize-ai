import jsonwebtoken from "jsonwebtoken";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export const POST = async (req) => {
    try {
        await connectDB();
        const { email, password } = await req.json();
        const existUser = await User.findOne({ email });

        if(existUser) return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 })
        
        const newUser = new User({ email, password });
        await newUser.save();

        const token = jsonwebtoken.sign({
            id: newUser.id,
            email: newUser.email
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
            token,
            user: {
                email: newUser.email,
                id: newUser.id,
                plan: newUser.plan,
                summarizeCount: newUser.summarizeCount
            }
        }, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}