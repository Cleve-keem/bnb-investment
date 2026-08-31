import { supabase } from "@/libs/supabase/browser";

const adminService = {
  async fetchUserProfiles() {
    const { data: profiles, error } = await supabase
      .from("users")
      .select("id, email, username, full_name, status")
      .order("created_at", { ascending: false });

    return { profiles, error };
  },

  async fetchUserWallets() {
    const { data: wallets, error } = await supabase
      .from("wallets")
      .select("user_id, balance, status, locked_balance");

    return { wallets, error };
  },

  async fetchUserOtps() {
    const { data: otps, error } = await supabase
      .from("otp-verifications")
      .select(
        "user_id, otp_code_hash, is_used, attempts, expires_at, verified_at",
      );

    return { otps, error };
  },
};

export default adminService;
