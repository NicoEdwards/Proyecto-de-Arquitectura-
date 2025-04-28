import { z } from "https://esm.sh/zod@3.22.4";

export const UserRegisterSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener mínimo 6 caracteres" }),
});

export const UserLoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña no puede estar vacía" }),
});

// Tipos inferidos automáticamente
export type UserRegisterData = z.infer<typeof UserRegisterSchema>;
export type UserLoginData = z.infer<typeof UserLoginSchema>;
