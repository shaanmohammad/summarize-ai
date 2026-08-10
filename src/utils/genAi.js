import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateAIResponse = async (prompt, model = 'llama-3.1-8b-instant') => {
    const response = await groq.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt}]
    })

    return response.choices[0].message.content;
}