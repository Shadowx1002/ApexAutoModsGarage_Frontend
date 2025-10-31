/*
  # Create Initial Database Schema for Apex Auto Mods Garage

  ## Summary
  This migration creates the core database structure for the car customization application,
  including user authentication, services catalog, and car build customizations.

  ## New Tables Created
  
  ### 1. `profiles` table
  - Stores user profile information linked to Supabase auth.users
  - Fields:
    - `id` (uuid, primary key) - References auth.users(id)
    - `name` (text) - User's full name
    - `email` (text) - User's email address
    - `created_at` (timestamptz) - Account creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `services` table
  - Stores available car modification services and parts
  - Fields:
    - `id` (uuid, primary key) - Unique service identifier
    - `name` (text) - Service/part name
    - `description` (text) - Detailed description
    - `category` (text) - Category (e.g., 'wheels', 'spoiler', 'exhaust', 'paint')
    - `price` (numeric) - Service price
    - `image_url` (text) - Optional image URL
    - `created_at` (timestamptz) - Creation timestamp

  ### 3. `builds` table
  - Stores user's car customization builds
  - Fields:
    - `id` (uuid, primary key) - Unique build identifier
    - `user_id` (uuid, foreign key) - References profiles(id)
    - `car_model` (text) - Selected car model
    - `color` (text) - Selected car color (hex code)
    - `selected_parts` (jsonb) - JSON object containing selected customization parts
    - `total_price` (numeric) - Total build cost
    - `created_at` (timestamptz) - Build creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only read their own profile data
  - Users can update their own profile
  - Services are publicly readable
  - Users can create and view their own builds
  - Users can update and delete their own builds

  ## Notes
  - Uses Supabase's built-in auth.users for authentication
  - Passwords are managed by Supabase Auth (no password storage in custom tables)
  - All timestamps use timestamptz for proper timezone handling
  - selected_parts stored as JSONB for flexibility
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Services policies (public read)
CREATE POLICY "Services are publicly readable"
  ON services FOR SELECT
  TO authenticated
  USING (true);

-- Create builds table
CREATE TABLE IF NOT EXISTS builds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  car_model text NOT NULL,
  color text NOT NULL DEFAULT '#000000',
  selected_parts jsonb DEFAULT '{}'::jsonb,
  total_price numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE builds ENABLE ROW LEVEL SECURITY;

-- Builds policies
CREATE POLICY "Users can view own builds"
  ON builds FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own builds"
  ON builds FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own builds"
  ON builds FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own builds"
  ON builds FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample services data
INSERT INTO services (name, description, category, price) VALUES
  ('Sport Wheels - Chrome', 'High-performance chrome sport wheels', 'wheels', 2500.00),
  ('Sport Wheels - Black', 'Matte black racing wheels', 'wheels', 2800.00),
  ('Carbon Fiber Spoiler', 'Lightweight carbon fiber rear spoiler', 'spoiler', 1500.00),
  ('GT Wing Spoiler', 'Aggressive GT-style wing spoiler', 'spoiler', 2200.00),
  ('Performance Exhaust', 'Titanium performance exhaust system', 'exhaust', 3500.00),
  ('Racing Exhaust', 'Loud racing exhaust with dual tips', 'exhaust', 4000.00),
  ('Metallic Paint Job', 'Premium metallic paint finish', 'paint', 5000.00),
  ('Matte Paint Job', 'Custom matte paint finish', 'paint', 5500.00),
  ('Body Kit - Aero', 'Complete aerodynamic body kit', 'bodykit', 8000.00),
  ('Body Kit - Racing', 'Aggressive racing body kit', 'bodykit', 9500.00)
ON CONFLICT DO NOTHING;