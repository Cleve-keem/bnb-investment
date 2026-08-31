import { supabase } from "@/libs/supabase/browser";
import adminService from "@/services/admin.service";
import { AdminUser } from "@/types/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function useAdminDashboardList() {
  const {
    data: users,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["admin-users-list"],
    queryFn: async () => {
      const { profiles, error: profileErr } =
        await adminService.fetchUserProfiles();

      if (profileErr) {
        throw new Error(profileErr.message);
      }

      const { wallets, error: walletsErr } =
        await adminService.fetchUserWallets();

      if (walletsErr) {
        throw new Error(walletsErr.message);
      }

      const { otps, error: otpErr } = await adminService.fetchUserOtps();

      if (otpErr) {
        throw new Error(otpErr.message);
      }

      const merged = (profiles ?? []).map((user) => {
        const wallet = wallets?.find((wallet) => wallet.user_id === user.id);
        const userOtp = otps?.find((o) => o.user_id === user?.id);

        return {
          ...user,
          wallet: wallet ?? null,
          latest_otp: userOtp
            ? {
                code: userOtp.otp_code_hash,
                expires_at: userOtp.expires_at,
                is_used: userOtp.is_used,
              }
            : undefined,
        };
      });

      return merged;
    },
  });

  return { users, isPending, refetch };
}

// 2. Mutation: Update User Balance & Yield
export function useUpdateBalanceMutation() {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const queryClient = useQueryClient();

  const updateBalanceMutation = useMutation({
    mutationFn: async ({
      userId,
      balance,
      yieldRate,
    }: {
      userId: string;
      balance: number;
      yieldRate: number;
    }) => {
      const { error } = await supabase.from("portfolios").upsert({
        user_id: userId,
        total_balance: balance,
        active_yield_rate: yieldRate,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Investor balance node successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-users-list"] });
      setSelectedUser(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to commit balance update.");
    },
  });

  return { updateBalanceMutation, selectedUser, setSelectedUser };
}

// 3. Mutation: Toggle User Suspension / Revoke Access
export function useToggleSuspendMutation() {
  const queryClient = useQueryClient();

  const toggleSuspendMutation = useMutation({
    mutationFn: async ({
      userId,
      suspend,
    }: {
      userId: string;
      suspend: boolean;
    }) => {
      const { error } = await supabase
        .from("users")
        .update({ is_suspended: suspend })
        .eq("id", userId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      toast.success(
        variables.suspend
          ? "Investor node isolated and suspended."
          : "Investor profile access restored.",
      );
      queryClient.invalidateQueries({ queryKey: ["admin-users-list"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update suspension status.");
    },
  });

  return toggleSuspendMutation;
}
