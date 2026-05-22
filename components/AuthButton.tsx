"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

interface AuthButtonProps {
  user: User | null;
  loading: boolean;
}

export default function AuthButton({ user, loading }: AuthButtonProps) {
  const handleSignIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={user.user_metadata?.avatar_url || "/default-avatar.png"}
          alt={user.user_metadata?.full_name || "User"}
          className="w-9 h-9 rounded-full border border-white/20"
        />
        <button
          onClick={handleSignOut}
          className="text-sm text-white/70 hover:text-white transition"
        >
          退出
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:from-blue-400 hover:to-indigo-400 transition-all"
    >
      Sign In
    </button>
  );
}
