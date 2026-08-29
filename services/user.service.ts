import { supabase } from "@/libs/supabase/browser";

const UserService = {
  async fetchUserProfile(userId: string) {
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

// export default class UserService {

//   static async getUserProfile(userId: string) {
//     const { data, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (error) throw error;
//     return data;
//   }
// }
