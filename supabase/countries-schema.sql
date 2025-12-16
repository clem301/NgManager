-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,

  -- Owner information
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Country settings
  flag_emoji TEXT DEFAULT '🏴',
  color TEXT DEFAULT '#3b82f6',

  -- Stats
  member_count INTEGER DEFAULT 1,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create country_members junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS country_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Member role within the country (different from global role)
  country_role TEXT DEFAULT 'membre',

  -- Joined date
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique constraint: a user can only be in a country once
  UNIQUE(country_id, user_id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_countries_owner_id ON countries(owner_id);
CREATE INDEX IF NOT EXISTS idx_countries_name ON countries(name);
CREATE INDEX IF NOT EXISTS idx_country_members_country_id ON country_members(country_id);
CREATE INDEX IF NOT EXISTS idx_country_members_user_id ON country_members(user_id);

-- Enable Row Level Security
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE country_members ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read countries
CREATE POLICY "Anyone can read countries"
  ON countries
  FOR SELECT
  USING (true);

-- Policy: Anyone can create a country
CREATE POLICY "Anyone can create countries"
  ON countries
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only owner can update their country
CREATE POLICY "Owner can update country"
  ON countries
  FOR UPDATE
  USING (owner_id::text = auth.uid()::text);

-- Policy: Only owner can delete their country
CREATE POLICY "Owner can delete country"
  ON countries
  FOR DELETE
  USING (owner_id::text = auth.uid()::text);

-- Policy: Everyone can read country members
CREATE POLICY "Anyone can read country members"
  ON country_members
  FOR SELECT
  USING (true);

-- Policy: Country members can be added by anyone (for now)
CREATE POLICY "Anyone can join countries"
  ON country_members
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can leave countries
CREATE POLICY "Users can leave countries"
  ON country_members
  FOR DELETE
  USING (user_id::text = auth.uid()::text);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_countries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_countries_updated_at
  BEFORE UPDATE ON countries
  FOR EACH ROW
  EXECUTE FUNCTION update_countries_updated_at();

-- Function to update member_count when members are added/removed
CREATE OR REPLACE FUNCTION update_country_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    UPDATE countries
    SET member_count = (
      SELECT COUNT(*)
      FROM country_members
      WHERE country_id = OLD.country_id
    )
    WHERE id = OLD.country_id;
    RETURN OLD;
  ELSIF (TG_OP = 'INSERT') THEN
    UPDATE countries
    SET member_count = (
      SELECT COUNT(*)
      FROM country_members
      WHERE country_id = NEW.country_id
    )
    WHERE id = NEW.country_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger to update member count
CREATE TRIGGER update_member_count_on_join
  AFTER INSERT ON country_members
  FOR EACH ROW
  EXECUTE FUNCTION update_country_member_count();

CREATE TRIGGER update_member_count_on_leave
  AFTER DELETE ON country_members
  FOR EACH ROW
  EXECUTE FUNCTION update_country_member_count();
