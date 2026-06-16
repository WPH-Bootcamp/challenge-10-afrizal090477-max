import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginUser, registerUser, getProfile } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth.store";
import type { LoginPayload, RegisterPayload } from "@/types/auth";



interface AuthMutationOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

export const useLogin = (
  options?: AuthMutationOptions,
) => {
  const setAuth = useAuthStore(
    (state) => state.setAuth,
  );

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      loginUser(payload),

    onSuccess: (data) => {
      setAuth(data.token, data.user);
      options?.onSuccess?.();
    },

    onError: (
      error: AxiosError<ErrorResponse>,
    ) => {
      const errorMessage =
        error.response?.data?.message ??
        "Gagal login. Silakan coba lagi.";

      options?.onError?.(errorMessage);
    },
  });
};

export const useRegister = (
  options?: AuthMutationOptions,
) => {
  const setAuth = useAuthStore(
    (state) => state.setAuth,
  );

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      registerUser(payload),

    onSuccess: (data) => {
      setAuth(data.token, data.user);
      options?.onSuccess?.();
    },

    onError: (
      error: AxiosError<ErrorResponse>,
    ) => {
      const errorMessage =
        error.response?.data?.message ??
        "Gagal mendaftar. Silakan coba lagi.";

      options?.onError?.(errorMessage);
    },
  });
};

export const useGetProfile = () => {
  const token = useAuthStore(
    (state) => state.token,
  );

  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfile,
    enabled: !!token,
  });
};