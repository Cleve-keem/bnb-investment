import {
  forgotPasswordSchema,
  LoginSchemaInput,
  RegisterSchemaInput,
} from "@/libs/validations/auth";
import { supabase } from "../supabase/browser";

export const AuthApi = {
  async login(data: LoginSchemaInput) {
    const { data: result, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return result;
  },

  async register(data: RegisterSchemaInput) {
    const fullName = [data.firstname, data.middlename, data.lastname]
      .filter(Boolean)
      .join(" ");

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          full_name: fullName.trim(),
          phone: data.phoneNumber,
        },
      },
    });

    if (error) {
      console.error("SUPABASE SIGNUP ERROR:", error);
      throw error;
    }

    return authData;
  },

  async forgotPassword() {
    return "change password";
  },
};
