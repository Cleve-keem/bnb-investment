import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthApi } from "@/libs/api/auth.api";

export function useLoginMutation() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: AuthApi.login,

    onMutate: () => {
      return toast.loading("Verifying credentials...");
    },

    onSuccess: (data, variables, contextToastId) => {
      // toast.dismiss(contextToastId);
      // toast.success("Welcome back!");
      // if (data.data.role === "admin") return router.push("/admin/dashboard");
      // router.push("/dashboard");
    },

    onError(error, variables, contextToastId) {
      toast.dismiss(contextToastId);
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
}

export function useRegisterMutation() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: AuthApi.register,

    onMutate: () => {
      return toast.loading("Processing validation records...");
    },

    onSuccess(data, variables, contextToastId) {
      toast.dismiss(contextToastId);
      toast.success(
        "Registration successful! Please check your email to verify your account.",
      );
      // router.push(
      //   `/auth/verify-email?email=${encodeURIComponent(data.data.email)}`,
      // );
    },

    onError: (error: any, variables, contextToastId) => {
      toast.dismiss(contextToastId);
      // In hooks/auth.ts -> useRegisterMutation
      if (error) {
        console.error(
          "Full Supabase Context Object:",
          JSON.stringify(error, null, 2),
        );
      }

      if (error.status === 429) {
        alert("Too many attempts. Please try again in an hour.");
      } else {
        toast.error(error.message);
      }
    },
  });
  return { mutate, isPending };
}
