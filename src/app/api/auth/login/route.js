import User from "@/models/User";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export const POST = async (req) => {
    try {
        await connectDB();
        const { email, password } = await req.json();
        const existUser = await User.findOne({ email });

        if(!existUser) return NextResponse.json({ message: 'Invalid email or password.' }, {status: 401})
        
        const isValidPassword = await bcrypt.compare(password, existUser.password);
        if(!isValidPassword) {
            return NextResponse.json({ message: 'Invalid email or password.' }, {status: '401'})
        }else {
            const token = jsonwebtoken.sign({
                id: existUser.id,
                email: existUser.email
            },  process.env.JWT_SECRET, { expiresIn: '7d' });

            return NextResponse.json({ token, user: { email: existUser.email, id: existUser.id } }, {status: 200})
        }
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})    
    }
}