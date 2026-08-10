import { getUserFromToken } from "@/utils/common.js";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/utils/db";

export const POST = async (req) => {
    try {
        await connectDB();
        const decoded = getUserFromToken(req);
        const user = await User.findById(decoded.id);

        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        if (user.plan !== 'pro') {
            const now = new Date();
            const daysSincePeriodStart = (now - user.periodStart) / (1000 * 60 * 60 * 24);

            if (daysSincePeriodStart >= 30) {
                user.summarizeCount = 0;
                user.periodStart = now;
            }

            if (user.summarizeCount >= 5) {
                return NextResponse.json(
                    { message: "Free plan limit reached. Upgrade to Pro for unlimited summaries." },
                    { status: 403 }
                );
            }
        }

        return NextResponse.json({
            message: "limit check passed",
            plan: user.plan,
            summarizeCount: user.summarizeCount
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}