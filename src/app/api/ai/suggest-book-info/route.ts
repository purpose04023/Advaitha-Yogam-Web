import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const { fileName } = await req.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a spiritual assistant for the "Advaitha Yogam" platform.
          The admin is uploading a PDF file named: "${fileName}".
          Suggest:
          1. A polished title for the book.
          2. A short (2-3 sentences) inspiring description in simple English.
          3. One category from this list: Advaita Vedanta, Pranayama, Philosophy, Meditation.
          4. Three search keywords for finding a cover image on Unsplash (e.g., "ancient manuscript", "yoga master", "himalayan temple").

          Respond ONLY in this JSON format:
          {
            "title": "...",
            "description": "...",
            "category": "...",
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
      title: fileName.replace(/\.pdf$/i, ''),
      description: "A beautiful teaching shared by our Guruji.",
      category: "Philosophy",
      keywords: ["spiritual", "meditation", "ancient text"]
    });
  }
}
