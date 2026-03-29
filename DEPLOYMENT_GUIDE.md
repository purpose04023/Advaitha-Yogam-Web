# Deployment Guide for Advaitha Yogam

## Vercel Deployment

1. **Connect your Repository:**
   Push your code to a GitHub/GitLab/Bitbucket repository and connect it to Vercel.

2. **Configure Environment Variables:**
   Add all variables from your `.env.local` to the Vercel project settings.

3. **Deploy:**
   Vercel will automatically detect Next.js and build the project using `npm run build`.

## Supabase Configuration

### 1. Database Schema
Execute the SQL provided in `supabase_schema.sql` within the Supabase SQL editor.

### 2. View Count RPC
Run this SQL to enable the view count increment:
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

### 3. Authentication
- Go to **Authentication > Providers** and ensure **Email** is enabled.
- Disable **Confirm Email** if you want to manually create and use accounts immediately.
- Go to **Authentication > Users** and manually add:
  - `subbu.eenadu@gmail.com`
  - `soppasripada@gmail.com`

### 4. Storage
- Create a bucket named `books` and set it to **Private**.
- Create a bucket named `covers` and set it to **Public**.

## API Keys

### Groq API (AI Brain)
1. Sign up at [Groq Cloud](https://console.groq.com/).
2. Create an API Key and add it as `GROQ_API_KEY`.

### Unsplash API (Images)
1. Sign up at [Unsplash Developers](https://unsplash.com/developers).
2. Create a new Application and add the Access Key as `UNSPLASH_ACCESS_KEY`.

### Brevo (Login Alerts)
1. Sign up at [Brevo](https://www.brevo.com/).
2. Get your SMTP API Key and add it as `BREVO_API_KEY`.
