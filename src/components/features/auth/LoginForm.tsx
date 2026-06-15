'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/components/common/PasswordInput';
import { useLogin } from '@/features/auth/useLogin';

import {
  loginSchema,
  type LoginInput,
} from '@/lib/validations/auth.schema';

export default function LoginForm() {
  const [apiError, setApiError] =
    useState<string | null>(null);

  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (
    values: LoginInput,
  ) => {
    setApiError(null);

    const result = await login(values);

    if (!result.success) {
      setApiError(
        result.message ??
          'Terjadi kesalahan sistem',
      );
    }
  };

  return (
    <>
      {apiError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
          {apiError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 md:gap-5"
      >
        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            disabled={isSubmitting}
            {...register('email')}
            className={`
              h-[48px]
              w-full
              rounded-[12px]
              border
              px-3
              text-[14px]
              text-[#0A0D12]
              placeholder-[#717680]
              transition-all
              focus:border-[#C12116]
              focus:outline-none
              disabled:opacity-50
              md:h-[56px]
              md:text-[16px]
              ${
                errors.email
                  ? 'border-red-500'
                  : 'border-[#D5D7DA]'
              }
            `}
          />

          {errors.email && (
            <span className="pl-1 text-xs font-medium text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        <PasswordInput
          placeholder="Password"
          disabled={isSubmitting}
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer select-none items-center gap-2">
            <input
              type="checkbox"
              disabled={isSubmitting}
              {...register('rememberMe')}
              className="
                h-5
                w-5
                border-[#D5D7DA]
                accent-[#C12116]
              "
            />

            <span className="text-sm font-medium text-[#0A0D12]">
              Remember Me
            </span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="
            mt-2
            h-[48px]
            w-full
            rounded-full
            bg-[#C12116]
            text-[16px]
            font-bold
            text-white
            hover:bg-[#a31a11]
          "
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Logging in...</span>
            </div>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </>
  );
}