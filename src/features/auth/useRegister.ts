'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { registerUser } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth.store';
import type { RegisterInput } from '@/lib/validations/auth.schema';

export const useRegister = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);


  const mutation = useMutation({
    mutationFn: async (values: RegisterInput) => {
      return await registerUser(values);
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      router.push('/');
      router.refresh();
    },
  });


  const registerAction = async (values: RegisterInput) => {
    try {
      await mutation.mutateAsync(values);
      return { success: true };
    } catch (error) {
      let message = 'Terjadi kesalahan saat mendaftar';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      return { success: false, message };
    }
  };

  return { 
    register: registerAction,
    isPending: mutation.isPending 
  };
};