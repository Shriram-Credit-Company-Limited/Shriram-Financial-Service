export const prerender = false;

import type { APIRoute } from 'astro';
import { pool } from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  const json = { 'Content-Type': 'application/json' };

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: json });
  }

  const name   = typeof body.name   === 'string' ? body.name.trim()   : '';
  const mobile = typeof body.mobile === 'string' ? body.mobile.trim() : '';
  const city   = typeof body.city   === 'string' ? body.city.trim()   : null;

  if (!name || !mobile) {
    return new Response(
      JSON.stringify({ error: 'name and mobile are required' }),
      { status: 400, headers: json },
    );
  }

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO partner_leads (name, mobile, city)
         VALUES ($1, $2, $3)
         ON CONFLICT (mobile) DO UPDATE
           SET name       = EXCLUDED.name,
               city       = EXCLUDED.city,
               updated_at = NOW()`,
        [name, mobile, city],
      );
    } catch (err) {
      console.error('[partner-lead] DB error:', err);
      return new Response(
        JSON.stringify({ error: 'Database error — lead not saved' }),
        { status: 500, headers: json },
      );
    }
  } else {
    // DATABASE_URL not configured yet — log locally so nothing is silently lost.
    console.log('[partner-lead] No DATABASE_URL set. Lead received (not persisted):', {
      name, mobile, city, ts: new Date().toISOString(),
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: json });
};
