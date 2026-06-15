import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { loginUser, registerUser } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth.store';
import type { LoginPayload, RegisterPayload } from '@/types/auth';

interface AuthMutationOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const useLogin = (options?: AuthMutationOptions) => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      options?.onSuccess?.();
    },
    onError: (error) => {
      let errorMessage = 'Gagal login. Silakan coba lagi.';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      
      options?.onError?.(errorMessage);
    },
  });
};

export const useRegister = (options?: AuthMutationOptions) => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      options?.onSuccess?.();
    },
    onError: (error) => {
      let errorMessage = 'Gagal mendaftar. Silakan coba lagi.';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      
      options?.onError?.(errorMessage);
    },
  });
};