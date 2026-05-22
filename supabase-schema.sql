-- Supabase SQL Schema for TripMind AI
-- Run this in Supabase SQL Editor

-- Create travel_history table
CREATE TABLE IF NOT EXISTS travel_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  question TEXT NOT NULL,
  ai_response JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_travel_history_user_id ON travel_history(user_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_travel_history_created_at ON travel_history(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE travel_history ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own travel history
CREATE POLICY "Users can view own travel history"
  ON travel_history
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Policy: Users can insert their own travel history
CREATE POLICY "Users can insert own travel history"
  ON travel_history
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Policy: Users can delete their own travel history
CREATE POLICY "Users can delete own travel history"
  ON travel_history
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- Note: Since we're using Clerk (not Supabase Auth), we'll use service role key
-- for server-side operations and bypass RLS. The RLS policies above are for
-- reference if you switch to Supabase Auth in the future.

-- For Clerk integration, we use service role key in API routes
-- and manually check user_id ownership in application code.
