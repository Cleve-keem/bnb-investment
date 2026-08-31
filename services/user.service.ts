import { supabase } from "@/libs/supabase/browser";

const UserService = {
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
      .select("id, first_name")
      .eq("email", email)
      .maybeSingle();

    return { userProfile, profileError };
  },

  
};

export default UserService;
