import Summary from "@/models/Summary";
import { getUserFromToken } from "@/utils/common";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const { id } = await params;
        const decoded = getUserFromToken(req);
        const summary = await Summary.findById(id);

        if (!summary) return NextResponse.json({ message: 'Summary not found' }, { status: 404 })

        if (summary.userId.toString() !== decoded.id) {
            return NextResponse.json({ message: 'User is not allowed' }, { status: 403 })
        }

        await summary.deleteOne();
        return new Response(null, { status: 204 });
    } catch (error) {
        if (error.name === "CastError") {
            return NextResponse.json({ message: "Invalid summary ID format." }, { status: 400 });
        }
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}