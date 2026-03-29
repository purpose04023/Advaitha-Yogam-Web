# Advaitha Yogam

A full-stack yoga knowledge platform dedicated to spreading the teachings of a spiritual guru.

## Tech Stack
- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **Backend/DB:** Supabase (Auth + Database + Storage)
- **AI Brain:** Groq API (llama-3.3-70b-versatile)
- **Images:** Unsplash API
- **Deployment:** Vercel

## Core Features
- **Public Website:** Serene homepage and library browse page for books (PDFs) and teachings.
- **Ultra-Secure Admin:** Restricted to two specific emails with IP locking and login alerts.
- **AI Assistant:** Groq-powered assistant that helps draft content, suggest titles/descriptions, and find cover images.
- **Rich Editor:** Simple TipTap-based editor for writing spiritual teachings.
- **Live Preview:** Real-time preview of how content will look on the public site.

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file with the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GROQ_API_KEY=your-groq-api-key
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
BREVO_API_KEY=your-brevo-api-key
```

### 2. Database Schema
Run the contents of `supabase_schema.sql` in your Supabase SQL Editor.
Also create an RPC function for view counts:
```sql
CREATE OR REPLACE FUNCTION increment_view_count(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE teachings
  SET view_count = view_count + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;
```

### 3. Storage Buckets
Create two buckets in Supabase Storage:
- `books`: Private (use signed URLs for access)
- `covers`: Public

### 4. Admin Access
The two authorized admin emails are:
- `subbu.eenadu@gmail.com`
- `soppasripada@gmail.com`

You must manually create these users in your Supabase Auth dashboard.

### 5. Run Locally
```bash
npm install
npm run dev
```
