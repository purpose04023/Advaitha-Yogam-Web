import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const { message } = await req.json();
  const supabase = createClient();

  // 1. Check if authenticated
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a spiritual assistant for the "Advaitha Yogam" platform.
          Your tone is calm, respectful, and helpful.
          The admins are not technical; speak in simple English.
          You can help with:
          - Generating titles and descriptions for books or teachings.
          - Suggesting categories (Advaita Vedanta, Pranayama, Philosophy, Meditation).
          - Suggesting Unsplash search keywords for cover images.
          - Interpreting commands like "Delete the last thing I uploaded" (you should explain what you will do and ask for confirmation).
          - Improving existing content.
          Always guide the admin step-by-step. Keep responses concise.`
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I am reflecting on that. Please try again.";

    // 2. Log interaction
    await supabase.from('ai_interactions').insert({
      admin_id: session.user.id,
      prompt_sent: message,
      ai_response: reply,
    });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
