-- Partner leads table — run once on your Amazon RDS PostgreSQL instance.
-- psql "postgresql://user:password@your-rds-endpoint:5432/shriram_financial" -f schema.sql

CREATE TABLE IF NOT EXISTS partner_leads (
  id          SERIAL       PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  mobile      VARCHAR(20)  NOT NULL,
  city        VARCHAR(100),
  source      VARCHAR(50)  NOT NULL DEFAULT 'become-a-partner',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  CONSTRAINT partner_leads_mobile_unique UNIQUE (mobile)
);

CREATE INDEX IF NOT EXISTS idx_partner_leads_mobile     ON partner_leads (mobile);
CREATE INDEX IF NOT EXISTS idx_partner_leads_created_at ON partner_leads (created_at DESC);

COMMENT ON TABLE  partner_leads              IS 'Partner registration leads from the Become a Partner page';
COMMENT ON COLUMN partner_leads.mobile       IS 'Primary contact number — unique per lead';
COMMENT ON COLUMN partner_leads.source       IS 'Which form/page generated this lead';
COMMENT ON COLUMN partner_leads.updated_at   IS 'Updated when a returning visitor resubmits with the same mobile number';
