import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "./useAuthSession";

export function useUserProfile() {
  const { userId } = useAuthSession();
  const queryKey = ["user", "profile", userId];
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey,
    enabled: !!userId,
    queryFn: async () => {
      const { profile, error } = await userService.fetchUserProfileById(
        userId!,
      );
      if (error) throw new Error(error.message);
      return profile;
    },
    staleTime: 30_000,
  });

  const updateMutation = useMutation({
    mutationFn: async (input: {
      fullName: string;
      username: string;
      phone: string;
    }) => {
      const { profile, error } = await userService.updateProfile(input);
      if (error) throw new Error(error.message);
      return profile;
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(queryKey, profile);
    },
  });

  return {
    profile: query.data,
    isPending: query.isPending,
    isError: query.isError,
    updateProfile: updateMutation.mutateAsync,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error,
  };
}
