-- Ajouter les colonnes de position visuelle
ALTER TABLE bunkers ADD COLUMN IF NOT EXISTS pos_x INTEGER NOT NULL DEFAULT 0;
ALTER TABLE bunkers ADD COLUMN IF NOT EXISTS pos_y INTEGER NOT NULL DEFAULT 0;

-- Supprimer la contrainte d'unicité sur x,y (ce sont maintenant juste des infos)
ALTER TABLE bunkers DROP CONSTRAINT IF EXISTS bunkers_country_id_x_y_key;
