import { createClient } from '@supabase/supabase-js';

/**
 * ONE shared client, configured with your public anon key.
 *   – Works in any React component (client or server).
 *   – No cookies, no extra helpers, no SSR trickery.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
