-- Disable email confirmation requirement for Supabase Auth
-- This allows users to sign up and log in immediately without email verification

-- Update auth configuration to disable email confirmation
UPDATE auth.config 
SET enable_signup = true;

-- Note: Email confirmation is disabled via Supabase Dashboard settings
-- Go to: Authentication > Providers > Email > Enable email confirmation (toggle OFF)
-- This SQL script is for documentation purposes
