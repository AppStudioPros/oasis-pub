-- Oasis Staff Table Migration
-- Run this in the Supabase SQL editor for project: hwzndsbkzabfcfbnvzge

CREATE TABLE IF NOT EXISTS oasis_staff (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  photo_url text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE oasis_staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active staff" ON oasis_staff
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage staff" ON oasis_staff
  FOR ALL USING (true) WITH CHECK (true);

-- Optional: updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_oasis_staff_updated_at
  BEFORE UPDATE ON oasis_staff
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
