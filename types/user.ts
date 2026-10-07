export type UserProfile = {
  id: string | number;
  first_name: string;
  last_name: string;
  middle_name?: string | undefined;
  email: string;
  username: string;
  phone?: string;
  user_role: "investor" | "admin";
  is_suspended: boolean;
  is_emai_verified?: boolean;
};
