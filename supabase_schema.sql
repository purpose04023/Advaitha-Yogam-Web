-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  color_hex TEXT DEFAULT '#E8873A',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teachings table (Books and Concepts)
CREATE TABLE teachings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('book', 'concept')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_name TEXT, -- Denormalized for simpler queries if needed
  file_url TEXT, -- For PDF books
  cover_image_url TEXT,
  content_text TEXT, -- For written concepts
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Login logs for security auditing
CREATE TABLE login_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT,
  email_attempted TEXT,
  status TEXT CHECK (status IN ('success', 'failed')),
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Login attempts for IP locking
CREATE TABLE login_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT NOT NULL,
  attempt_count INTEGER DEFAULT 1,
  last_attempt TIMESTAMPTZ DEFAULT NOW(),
  locked_until TIMESTAMPTZ,
  UNIQUE(ip_address)
);

-- AI Interactions log
CREATE TABLE ai_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES auth.users(id),
  prompt_sent TEXT,
  ai_response TEXT,
  action_taken TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachings ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- Public read access for categories and teachings
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for teachings" ON teachings FOR SELECT USING (true);

-- Admin only access (restricted to the two hardcoded emails in middleware,
-- but we can add basic RLS for authenticated users here as a second layer)
CREATE POLICY "Admin full access for categories" ON categories ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for teachings" ON teachings ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin access for login_logs" ON login_logs ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin access for login_attempts" ON login_attempts ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin access for ai_interactions" ON ai_interactions ALL USING (auth.role() = 'authenticated');
