'use client';

import { supabase } from '../../../lib/supabase'; 
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();   
    router.replace('/login');        
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-rose-600 hover:bg-rose-700 px-3 py-1 rounded text-white text-sm"
    >
      Logout
    </button>
  );
}
