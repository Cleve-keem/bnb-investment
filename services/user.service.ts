import { supabase } from "@/libs/supabase/browser";
import { UserProfile } from "@/types/auth";

const userService = {
  async fetchUserProfileById(userId: string) {
    const { data: profile, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    return { profile, error };
  },

  async getUserByEmail(email: string) {
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("id, full_name")
      .eq("email", email)
      .maybeSingle();
    return { userProfile, profileError };
  },
  async updateProfile(input: {
    fullName: string;
    username: string;
    phone: string;
  }) {
    const { data, error } = await supabase.rpc("update_own_profile", {
      p_full_name: input.fullName,
      p_username: input.username,
      p_phone: input.phone,
    });

    return { profile: data as UserProfile | null, error };
  },
};

export default userService;
