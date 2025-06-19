"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../../lib/supabase"; // ← already a client, no ()
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // 1️⃣  Redirect if a session already exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) router.replace("/vault");
    });

    // 2️⃣  Redirect as soon as login/signup succeeds
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) router.replace("/vault");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      {/* Ocean waves background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600 to-transparent"></div>
        <div className="absolute bottom-8 left-0 right-0 h-16 bg-gradient-to-t from-blue-500 to-transparent animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {/* Pirate Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-amber-300 drop-shadow-lg">
              🏴‍☠️ SnapVault ⚓️
            </h1>
            <p className="text-xl text-blue-200 font-medium mb-2">
              Ahoy, matey! Ready to access yer treasure?
            </p>
            <div className="flex justify-center space-x-3 text-2xl">
              <span>🦜</span>
              <span>⚔️</span>
              <span>💰</span>
              <span>🗝️</span>
              <span>⚓️</span>
            </div>
          </div>

          {/* Login Treasure Chest */}
          <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/60 backdrop-blur-sm border-4 border-amber-600/50 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🗝️</div>
              <h2 className="text-2xl font-bold text-amber-200 mb-2">
                Unlock Yer Digital Vault
              </h2>
              <p className="text-amber-300/80 text-sm">
                Enter yer credentials to access the treasure chamber
              </p>
            </div>

            <div className="bg-amber-950/30 rounded-xl border border-amber-700/50 p-6">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  style: {
                    container: { color: "#f3f4f6" },
                    button: {
                      background: "linear-gradient(to right, #d97706, #b45309)",
                      border: "2px solid rgba(217, 119, 6, 0.5)",
                      borderRadius: "0.5rem",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      padding: "0.75rem 1.5rem",
                    },
                    input: {
                      background: "rgba(30, 41, 59, 0.5)",
                      border: "2px solid rgba(217, 119, 6, 0.3)",
                      borderRadius: "0.5rem",
                      color: "#f3f4f6",
                      fontSize: "1rem",
                      padding: "0.75rem",
                    },
                    label: {
                      color: "#fbbf24",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    },
                    message: {
                      color: "#fbbf24",
                      fontSize: "0.875rem",
                      textAlign: "center",
                    },
                  },
                }}
                providers={[]} /* email-password only */
                magicLink={false} /* instant access after signup */
                theme="dark"
              />
            </div>

            <div className="text-center mt-6">
              <p className="text-amber-300/70 text-sm">
                🌊 Set sail to yer digital treasure trove 🌊
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-blue-300/70">
            <p className="text-sm">⚔️ Secure as Davy Jones' Locker ⚔️</p>
          </div>
        </div>
      </div>
    </main>
  );
}
