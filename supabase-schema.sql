-- NovagenAI Database Schema for Supabase

-- Users table with tier system
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  credits INTEGER DEFAULT 3,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Presentations table
CREATE TABLE presentations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  cover_image TEXT,
  industry VARCHAR(50),
  tone VARCHAR(50),
  length VARCHAR(20),
  style VARCHAR(50),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage analytics table
CREATE TABLE usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'content_generation', 'image_generation', 'voice_generation'
  provider VARCHAR(50), -- 'openai', 'claude', 'gemini', etc.
  user_tier VARCHAR(20),
  priority VARCHAR(20),
  cost_cents INTEGER DEFAULT 0,
  tokens_used INTEGER,
  response_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cache table for API responses
CREATE TABLE cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  request_hash TEXT NOT NULL,
  result JSONB NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams table for enterprise features
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  brand_color VARCHAR(7) DEFAULT '#6366F1',
  custom_domain TEXT,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Templates table
CREATE TABLE templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  industry VARCHAR(50),
  category VARCHAR(50),
  structure JSONB NOT NULL,
  preview_image TEXT,
  is_public BOOLEAN DEFAULT false,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Billing and subscriptions
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status VARCHAR(20) NOT NULL, -- 'active', 'canceled', 'past_due', 'unpaid'
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API usage quotas
CREATE TABLE api_quotas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL,
  quota_type VARCHAR(20) NOT NULL, -- 'daily', 'monthly'
  limit_count INTEGER NOT NULL,
  used_count INTEGER DEFAULT 0,
  reset_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, provider, quota_type)
);

-- Collaboration sessions
CREATE TABLE collaboration_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  presentation_id UUID REFERENCES presentations(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  participants JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_presentations_user_id ON presentations(user_id);
CREATE INDEX idx_presentations_created_at ON presentations(created_at DESC);
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at DESC);
CREATE INDEX idx_cache_expires_at ON cache(expires_at);
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = email::text);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = email::text);

-- Presentations
CREATE POLICY "Users can view own presentations" ON presentations FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create presentations" ON presentations FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own presentations" ON presentations FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own presentations" ON presentations FOR DELETE USING (user_id = auth.uid());

-- Team members can access team presentations
CREATE POLICY "Team members can view team presentations" ON presentations FOR SELECT USING (
  user_id IN (
    SELECT user_id FROM team_members WHERE team_id = presentations.user_id
  )
);

-- Usage logs
CREATE POLICY "Users can view own usage logs" ON usage_logs FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can insert usage logs" ON usage_logs FOR INSERT WITH CHECK (true);

-- Teams
CREATE POLICY "Team members can view team" ON teams FOR SELECT USING (
  id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
);
CREATE POLICY "Team owners can update team" ON teams FOR UPDATE USING (owner_id = auth.uid());

-- Team members
CREATE POLICY "Team members can view team membership" ON team_members FOR SELECT USING (
  user_id = auth.uid() OR 
  team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid() AND role = 'admin')
);

-- Subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (user_id = auth.uid());

-- Functions for automatic credit management
CREATE OR REPLACE FUNCTION deduct_credits()
RETURNS TRIGGER AS $$
BEGIN
  -- Deduct 1 credit when presentation is created
  IF TG_OP = 'INSERT' THEN
    UPDATE users 
    SET credits = credits - 1 
    WHERE id = NEW.user_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_deduct_credits
AFTER INSERT ON presentations
FOR EACH ROW
EXECUTE FUNCTION deduct_credits();

-- Function to reset daily quotas
CREATE OR REPLACE FUNCTION reset_daily_quotas()
RETURNS void AS $$
BEGIN
  UPDATE api_quotas 
  SET used_count = 0, reset_at = NOW() + interval '1 day'
  WHERE quota_type = 'daily' AND reset_at <= NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to get user tier with fallback
CREATE OR REPLACE FUNCTION get_user_tier(user_email TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    (SELECT tier FROM users WHERE email = user_email),
    'free'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
