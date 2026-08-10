import { getUserFromToken } from "@/utils/common.js";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/utils/db";

export const POST = async (req) => {
    try {
        await connectDB();
        const decoded = getUserFromToken(req);

        return NextResponse.json({ message: "AI Response" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}