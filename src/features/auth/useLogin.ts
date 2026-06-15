'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { loginUser } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth.store';
import type { LoginInput } from '@/lib/validations/auth.schema';

interface LoginResult {
  success: boolean;
  message?: string;
}

interface ApiErrorResponse {
  success: boolean;
  message: string;
}

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: async (values: LoginInput) => {
      return await loginUser({
        email: values.email,
        password: values.password,
      });
    },
    onSuccess: (authData) => {
      setAuth(authData.token, authData.user);
      toast.success('Login berhasil!');
      
      router.push('/');
      router.refresh();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = error.response?.data?.message || 'Terjadi kesalahan sistem';
      toast.error(message);
    },
  });

  const login = async (values: LoginInput): Promise<LoginResult> => {
    try {
      await mutation.mutateAsync(values);
      return { success: true };
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        return {
          success: false,
          message: axiosError.response?.data?.message || 'Terjadi kesalahan sistem',
        };
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Terjadi kesalahan sistem',
      };
    }
  };

  return {
    login,
    isPending: mutation.isPending, 
  };
};