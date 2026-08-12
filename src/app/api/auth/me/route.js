import User from "@/models/User";
import { getUserFromToken } from "@/utils/common"
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    let decoded;
    try {
        decoded = getUserFromToken(req);
    } catch (error) {
        return NextResponse.json({ message: error.message }, {status: 401})
    }

    try {
        await connectDB();
        const user = await User.findById(decoded.id).select('-password');

        if(!user) return NextResponse.json({ message: 'User not found' },{ status: 404 });

        return NextResponse.json({ data: user }, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })   
    }
}