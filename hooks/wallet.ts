"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/browser";

export function useWalletSummary() {
  return useQuery({
    queryKey: ["wallet", "summary"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const [walletRes, investmentsRes] = await Promise.all([
        supabase
          .from("wallets")
          .select("balance, locked_balance, currency")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("investments")
          .select("amount, expected_profit, status")
          .eq("user_id", user.id),
      ]);

      if (walletRes.error) throw new Error(walletRes.error.message);
      if (investmentsRes.error) throw new Error(investmentsRes.error.message);
      if (!walletRes.data) throw new Error("Wallet not found");

      const investments = investmentsRes.data ?? [];

      // Principal of still-active investments -- debited from balance when
      // created, so it needs adding back for "total value." No live accrual
      // model exists yet (no investment_current_value() in this project),
      // so this is principal only, not current mark-to-market value.
      const investedValue = investments
        .filter((i) => i.status === "active" || i.status === "pending")
        .reduce((sum, i) => sum + Number(i.amount), 0);

      // Realized profit only -- completed investments already credited
      // principal + profit back into balance via complete_investment(), so
      // this is a display figure, not added into totalValue (that would
      // double-count it).
      const totalReturn = investments
        .filter((i) => i.status === "completed")
        .reduce((sum, i) => sum + Number(i.expected_profit), 0);

      return {
        balance: Number(walletRes.data.balance),
        available:
          Number(walletRes.data.balance) -
          Number(walletRes.data.locked_balance),
        currency: walletRes.data.currency,
        totalValue: Number(walletRes.data.balance) + investedValue,
        totalReturn,
      };
    },
    staleTime: 30_000,
  });
}
