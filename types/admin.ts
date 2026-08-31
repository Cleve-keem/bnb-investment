export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  role: "user" | "admin";
  status: "active" | "suspended" | "deactivated";
  first_login: boolean;
  email_verified_at: string | null;
  last_login_at: string | null;

  wallet: {
    balance: number;
    locked_balance: number;
    status: string;
  } | null;
}
