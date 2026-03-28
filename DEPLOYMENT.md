# Deployment Guide - Advaitha Vedanta Web

This guide explains how to deploy the application to **Render** (as a Static Site) and how to configure the necessary environment variables.

## 1. Deploying to Render

1.  **Create a New Static Site**:
    *   Log in to [Render](https://render.com/).
    *   Click **New +** and select **Static Site**.
    *   Connect your GitHub repository.
2.  **Configure Build Settings**:
    *   **Build Command**: `npm install && npm run build`
    *   **Publish Directory**: `dist`
3.  **Environment Variables**:
    *   Go to the **Environment** tab of your Static Site in Render.
    *   Add the variables listed in the next section.

---

## 2. Environment Variables Reference

The following environment variables are required for full functionality (Newsletter, Admin Portal, AI Assistant).

| Variable | Description | Where to find it |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase Project URL | [Supabase Dashboard](https://supabase.com/dashboard) > Project Settings > API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Anonymous API Key | [Supabase Dashboard](https://supabase.com/dashboard) > Project Settings > API |
| `VITE_BREVO_API_KEY` | API Key for Newsletter | [Brevo Dashboard](https://app.brevo.com/) > SMTP & API > API Keys |
| `VITE_BREVO_LIST_ID` | The ID of your contact list | [Brevo Dashboard](https://app.brevo.com/) > Contacts > Lists |
| `VITE_GOOGLE_GEMINI_KEY` | API Key for AI Assistant | [Google AI Studio](https://aistudio.google.com/app/apikey) |

### Optional Variables
*   `VITE_AI_ASSISTANT_URL`: If you have a custom proxy or backend for AI, you can provide its URL here. If omitted, the app will try to call the Google Gemini API directly using your `VITE_GOOGLE_GEMINI_KEY`.

---

## 3. Post-Deployment Setup

### Admin Portal Access
The Admin Portal (`/admin`) is restricted to the email: **subbu.eenadu@gmail.com**.
1.  Go to your **Supabase Dashboard** > **Authentication** > **Users**.
2.  Manually invite or create a user with that exact email address.
3.  Ensure the user verifies their email to log in successfully.

### PDF/Image Storage
To enable content uploads in the Admin Portal:
1.  In **Supabase Dashboard** > **Storage**, create two buckets:
    *   `articles` (Public)
    *   `gallery` (Public)
2.  Set appropriate RLS policies to allow the authenticated admin user to upload files.

---

## 4. Local Development
To run the app locally with these features, create a `.env` file in the root directory (based on `.env.example`) and add your keys there.

```bash
npm install
npm run dev
```
