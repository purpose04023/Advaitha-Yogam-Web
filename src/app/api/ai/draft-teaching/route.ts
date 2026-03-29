import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const { prompt } = await req.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a spiritual assistant for the "Advaitha Yogam" platform.
          The admin wants to write a teaching about: "${prompt}".
          Suggest:
          1. A polished title for the teaching.
          2. A 2-3 paragraph introduction/body draft in HTML format (using <p> tags only, keep it simple).
          3. Three search keywords for finding a cover image on Unsplash (e.g., "tranquility", "sunrise", "ancient library").

          Respond ONLY in this JSON format:
          {
            "title": "...",
            "content": "...",
            "keywords": ["...", "...", "..."]
          }`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({
      title: "New Teaching",
      content: "<p>Start writing your wisdom here...</p>",
      keywords: ["wisdom", "spiritual", "peace"]
    });
  }
}
