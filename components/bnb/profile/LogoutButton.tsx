"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/libs/supabase/browser";

export default function LogoutButton() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      toast.success("You have been logged out.");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again.",
      );

      setIsLoggingOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/6 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoggingOut ? (
        <>
          <Loader2 size={17} className="animate-spin" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut size={17} />
          Log out
        </>
      )}
    </button>
  );
}
