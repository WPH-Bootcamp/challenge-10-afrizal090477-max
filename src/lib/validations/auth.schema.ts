import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),

  password: z
    .string()
    .trim()
    .min(6, 'Password minimal harus 6 karakter'),

  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Nama minimal harus 2 karakter'),

    email: z
      .string()
      .trim()
      .min(1, 'Email wajib diisi')
      .email('Format email tidak valid'),

    phone: z
      .string()
      .trim()
      .min(8, 'Nomor telepon minimal 8 digit'),

    password: z
      .string()
      .trim()
      .min(6, 'Password minimal harus 6 karakter'),

    confirmPassword: z
      .string()
      .trim()
      .min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Password dan konfirmasi password tidak sama',
      path: ['confirmPassword'],
    },
  );

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;