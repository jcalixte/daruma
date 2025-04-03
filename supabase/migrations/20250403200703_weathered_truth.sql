/*
  # Create Daruma dolls tracking system

  1. New Tables
    - `darumas`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `wish` (text, the commitment/wish)
      - `first_eye_date` (timestamptz, when first commitment was made)
      - `second_eye_date` (timestamptz, when commitment was fulfilled)
      - `created_at` (timestamptz)
      - `color` (text, daruma color)

  2. Security
    - Enable RLS on `darumas` table
    - Add policies for authenticated users to:
      - Read their own darumas
      - Create new darumas
      - Update their own darumas
      - Delete their own darumas
*/

CREATE TABLE darumas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  wish text NOT NULL,
  first_eye_date timestamptz,
  second_eye_date timestamptz,
  created_at timestamptz DEFAULT now(),
  color text NOT NULL,
  CONSTRAINT valid_dates CHECK (
    (first_eye_date IS NULL AND second_eye_date IS NULL) OR
    (first_eye_date IS NOT NULL AND second_eye_date IS NULL) OR
    (first_eye_date IS NOT NULL AND second_eye_date IS NOT NULL AND first_eye_date <= second_eye_date)
  )
);

ALTER TABLE darumas ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own darumas"
  ON darumas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create darumas"
  ON darumas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own darumas"
  ON darumas
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own darumas"
  ON darumas
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);