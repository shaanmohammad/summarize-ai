import { getUserFromToken } from "@/utils/common.js";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import { generateAIResponse } from "@/utils/genAi";

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

        const { text, tone } = await req.json();

        if (!text || !tone) {
            return NextResponse.json({ message: "Text and tone are required." }, { status: 400 });
        }

        // AI Integration
        const prompt = `Summarize the following text in a ${tone} tone. Respond ONLY with valid JSON in this exact format, no markdown formatting, no code fences: {"title": "a short descriptive title", "summary": "the summary text"}. Text to summarize: ${text}`;
        const rawResponse = await generateAIResponse(prompt);
        let parsedResponse;

        try {
            parsedResponse = JSON.parse(rawResponse);
        } catch (error) {
            return NextResponse.json({ message: "AI returned an unexpected format. Please try again." }, { status: 502 });
        }

        user.summarizeCount += 1;
        await user.save();

        return NextResponse.json({ title: parsedResponse.title, summary: parsedResponse.summary });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}