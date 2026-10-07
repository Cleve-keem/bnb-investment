"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/browser";

export type ChartRange = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y";

const RANGE_DAYS: Record<ChartRange, number> = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
};

export function useWalletBalanceHistory(range: ChartRange) {
  return useQuery({
    queryKey: ["wallet", "balance-history", range],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: wallet, error: walletError } = await supabase
        .from("wallets")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (walletError) throw new Error(walletError.message);
      if (!wallet) return [];

      const { data: txns, error } = await supabase
        .from("wallet_transactions")
        .select("balance_after, created_at")
        .eq("wallet_id", wallet.id)
        .order("created_at", { ascending: true });
      if (error) throw new Error(error.message);

      const since = new Date();
      since.setDate(since.getDate() - RANGE_DAYS[range]);

      const before = (txns ?? []).filter((t) => new Date(t.created_at) < since);
      const inWindow = (txns ?? []).filter(
        (t) => new Date(t.created_at) >= since,
      );

      // Anchor the line to the balance as of the window's start, so a user
      // with history before `since` doesn't see the chart falsely start at $0.
      const startValue =
        before.length > 0 ? Number(before[before.length - 1].balance_after) : 0;

      return [
        { date: formatChartDate(since), value: startValue },
        ...inWindow.map((t) => ({
          date: formatChartDate(new Date(t.created_at)),
          value: Number(t.balance_after),
        })),
      ];
    },
    staleTime: 30_000,
  });
}

function formatChartDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
