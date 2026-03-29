# Deployment & Configuration Guide for Advaitha Yogam

## Environment Variables
The application requires the following environment variables (Vite prefix `VITE_`):

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Project Anon Key |
| `VITE_BREVO_API_KEY` | API Key for Newsletter integration (Brevo) |
| `VITE_GEMINI_API_KEY` | API Key for Admin AI Assistant (Google Gemini) |

## Render Deployment (Fix for Error 127)
To ensure successful deployment on Render:
1.  **Build Command:** `npm install; npm run build`
2.  **Start Command:** `npm run preview` (or serve the `dist` folder as a Static Site)
3.  **Vite in Dependencies:** Ensure `vite`, `@vitejs/plugin-react`, and `@tailwindcss/vite` are in the `dependencies` section of `package.json` (This has been done).

## Admin Portal Access
The Admin portal is located at `/admin`.

### Accessing the Portal:
1.  Go to `/login`.
2.  **Manual Login:** Enter one of the following admin emails:
    - `subbu.eenadu@gmail.com`
    - `soppasripada@gmail.com`
3.  **Password:** `Advaitha@2025`
4.  Once logged in, click the "Admin" link in the Navbar to access the dashboard.

## Multi-Language Support
The app supports 11 Indian languages plus English. It automatically defaults to **Telugu** for users in the Indian timezone (`Asia/Kolkata`).
