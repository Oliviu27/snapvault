'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../../lib/supabase';        // ← already a client, no ()
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // 1️⃣  Redirect if a session already exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) router.replace('/vault');
    });

    // 2️⃣  Redirect as soon as login/signup succeeds
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) router.replace('/vault');
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0d1b2a]">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}      /* email-password only */
        magicLink={false}   /* instant access after signup */
        theme="dark"
      />
    </main>
  );
}
