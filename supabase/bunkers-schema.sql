-- Table pour stocker les bunkers
CREATE TABLE IF NOT EXISTS bunkers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('vacant', 'paid', 'occupied')),
  name TEXT,
  occupant_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(country_id, x, y)
);

-- Index pour les requêtes par pays
CREATE INDEX IF NOT EXISTS idx_bunkers_country_id ON bunkers(country_id);

-- RLS policies (désactivé pour développement)
ALTER TABLE bunkers DISABLE ROW LEVEL SECURITY;
