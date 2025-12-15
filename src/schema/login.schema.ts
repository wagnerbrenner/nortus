import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Campo obrigatório.")
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const cpfRegex = /^\d{11}$/;
      const passportRegex = /^[A-Za-z0-9]{6,}$/;

      return emailRegex.test(val) || cpfRegex.test(val) || passportRegex.test(val);
    }, "E-mail, CPF ou passaporte inválido."),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
  remember: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
