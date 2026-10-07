"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/browser";

export function useWithdrawFormData() {
  return useQuery({
    queryKey: ["withdraw", "form-data"],
    queryFn: async () => {
      const [{ data: userData }, walletRes, feeRes] = await Promise.all([
        supabase.auth.getUser(),
        supabase
          .from("wallets")
          .select("balance, locked_balance, currency")
          .single(),
        supabase.rpc("get_setting_numeric", { p_key: "withdrawal_fee_flat" }),
      ]);

      if (walletRes.error) throw new Error(walletRes.error.message);
      const wallet = walletRes.data;

      return {
        balance: wallet.balance,
        lockedBalance: wallet.locked_balance,
        available: wallet.balance - wallet.locked_balance,
        currency: wallet.currency,
        fee: feeRes.data ?? 0,
        email: userData.user?.email ?? "",
      };
    },
    staleTime: 15_000,
  });
}
