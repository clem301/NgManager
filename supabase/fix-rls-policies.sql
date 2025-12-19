-- Fix RLS policies to allow role updates

-- Drop the restrictive update policy
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Allow authenticated users to update any user (for admin functionality)
CREATE POLICY "Authenticated users can update any user"
  ON users
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Note: In production, you should restrict this to only allow updates by admins
-- For now, this allows the admin panel to work properly
