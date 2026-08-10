import Summary from "@/models/Summary";
import { getUserFromToken } from "@/utils/common";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connectDB();
        const decoded = getUserFromToken(req);

        const { title, summary, tone } = await req.json();
        const newSummary = new Summary({ title, summary, tone, userId: decoded.id });
        await newSummary.save();

        return NextResponse.json({ data: newSummary }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const GET = async (req) => {
    try {
        await connectDB();
        const decoded = getUserFromToken(req);
        const summaries = await Summary.find({ userId: decoded.id }).sort({ createdAt: -1 })

        return NextResponse.json({ data: summaries }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}