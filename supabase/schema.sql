-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,

  -- Role information (denormalized for performance)
  role_id TEXT NOT NULL DEFAULT 'recrue',
  role_name TEXT NOT NULL DEFAULT 'Recrue',
  role_level INTEGER NOT NULL DEFAULT 10,
  role_color TEXT NOT NULL DEFAULT '#808080',
  role_emoji TEXT NOT NULL DEFAULT '⚪',
  role_description TEXT NOT NULL DEFAULT 'Nouveau membre - Accès limité',

  -- Country relationship
  country_id UUID,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role_level ON users(role_level);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all users (for admin panel)
CREATE POLICY "Users can read all users"
  ON users
  FOR SELECT
  USING (true);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Policy: Anyone can insert (register)
CREATE POLICY "Anyone can register"
  ON users
  FOR INSERT
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
