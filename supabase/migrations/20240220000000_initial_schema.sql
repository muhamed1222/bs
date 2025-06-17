-- Создаем enum для ролей пользователей
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Создаем enum для типов подписок
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'enterprise');

-- Создаем enum для типов блоков
CREATE TYPE block_type AS ENUM (
  'text',
  'image',
  'video',
  'link',
  'social',
  'embed',
  'gallery'
);

-- Таблица пользователей
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  role user_role DEFAULT 'user',
  subscription_tier subscription_tier DEFAULT 'free',
  subscription_features JSONB DEFAULT '{
    "maxPages": 1,
    "maxBlocksPerPage": 5,
    "allowedBlockTypes": ["text", "image"],
    "analytics": false,
    "customDomain": false
  }',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица страниц
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  style JSONB,
  analytics JSONB DEFAULT '{
    "views": 0,
    "lastViewed": null
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, slug)
);

-- Таблица блоков
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  type block_type NOT NULL,
  content TEXT NOT NULL,
  alt TEXT,
  style JSONB,
  metadata JSONB,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица аналитики
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  average_time_on_page INTEGER DEFAULT 0,
  bounce_rate DECIMAL DEFAULT 0,
  referrers JSONB DEFAULT '[]',
  devices JSONB DEFAULT '[]',
  browsers JSONB DEFAULT '[]',
  countries JSONB DEFAULT '[]',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица сессий
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(token)
);

-- Индексы
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_pages_user_id ON pages(user_id);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_blocks_page_id ON blocks(page_id);
CREATE INDEX idx_blocks_order ON blocks(page_id, order_index);
CREATE INDEX idx_analytics_page_id ON analytics(page_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token);

-- Триггеры для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blocks_updated_at
  BEFORE UPDATE ON blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) политики
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Политики для users
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Политики для pages
CREATE POLICY "Anyone can view public pages"
  ON pages FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can view their own pages"
  ON pages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pages"
  ON pages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pages"
  ON pages FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pages"
  ON pages FOR DELETE
  USING (auth.uid() = user_id);

-- Политики для blocks
CREATE POLICY "Anyone can view blocks of public pages"
  ON blocks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM pages
    WHERE pages.id = blocks.page_id
    AND pages.is_public = true
  ));

CREATE POLICY "Users can view blocks of their pages"
  ON blocks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM pages
    WHERE pages.id = blocks.page_id
    AND pages.user_id = auth.uid()
  ));

CREATE POLICY "Users can create blocks in their pages"
  ON blocks FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM pages
    WHERE pages.id = blocks.page_id
    AND pages.user_id = auth.uid()
  ));

CREATE POLICY "Users can update blocks in their pages"
  ON blocks FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM pages
    WHERE pages.id = blocks.page_id
    AND pages.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete blocks in their pages"
  ON blocks FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM pages
    WHERE pages.id = blocks.page_id
    AND pages.user_id = auth.uid()
  ));

-- Политики для analytics
CREATE POLICY "Users can view analytics of their pages"
  ON analytics FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM pages
    WHERE pages.id = analytics.page_id
    AND pages.user_id = auth.uid()
  ));

-- Политики для sessions
CREATE POLICY "Users can manage their own sessions"
  ON sessions FOR ALL
  USING (auth.uid() = user_id); 