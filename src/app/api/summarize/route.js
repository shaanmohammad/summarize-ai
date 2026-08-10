import { getUserFromToken } from "@/utils/common.js";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

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

        // const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // const aiModel = genAi.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const prompt = `Summarize the following text in a ${tone} tone. Respond ONLY with valid JSON in this exact format, no markdown formatting, no code fences: {"title": "a short descriptive title", "summary": "the summary text"}. Text to summarize: ${text}`;
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
        });
        // const result = await aiModel.generateContent(prompt);
        const rawResponse = completion.choices[0].message.content;
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