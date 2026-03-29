# Deployment & Configuration Guide for Advaitha Yogam

To ensure the website is fully functional on Vercel or Render, you must configure the following Environment Variables in your hosting provider's dashboard.

## Required Environment Variables

| Variable Name | Description | Where to get it |
|---------------|-------------|-----------------|
| `VITE_SUPABASE_URL` | Your Supabase Project URL | Supabase Dashboard > Project Settings > API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Anonymous API Key | Supabase Dashboard > Project Settings > API |
| `VITE_BREVO_API_KEY` | Your Brevo (formerly Sendinblue) API Key | Brevo Dashboard > SMTP & API > API Keys |
| `VITE_GOOGLE_GEMINI_KEY` | Google Gemini API Key | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `VITE_AI_ASSISTANT_URL` | (Optional) Backend URL for AI tasks | Your deployed backend URL (if any) |

## Admin Portal Access

The Admin Portal is restricted to authorized administrators for security.

1.  **Authorized Emails:** `subbu.eenadu@gmail.com`, `soppasripada@gmail.com`
2.  **Access Steps:**
    *   Click "Login" on the website and sign in with one of the authorized Google accounts.
    *   Once logged in, an "Admin" link will appear in the top navigation bar.
    *   Alternatively, you can navigate directly to `/admin`.
3.  **Authentication Setup:** Ensure that you have enabled "Google" as an Auth Provider in your Supabase project under **Authentication > Providers**.

## Render "Error 127" Fix

The "Error 127" was caused by `vite` being in `devDependencies`. I have moved it to `dependencies` in `package.json`. This ensures that the `vite build` command can run correctly on production servers like Render.
