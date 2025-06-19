"use client";

import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 border-2 border-red-600/50 px-4 py-2 rounded-lg text-white font-bold text-sm shadow-lg transform transition-all hover:scale-105 flex items-center backdrop-blur-sm"
      title="🏴‍☠️ Ready to set sail from these waters? 🌊"
    >
      <span className="mr-2">⚓️</span>
      Abandon Ship
      <span className="ml-2">🚢</span>
    </button>
  );
}
