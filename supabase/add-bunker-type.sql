-- Ajouter le type de bunker (normal = carré, member = triangle)
ALTER TABLE bunkers ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'normal' CHECK (type IN ('normal', 'member'));
