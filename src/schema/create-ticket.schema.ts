import { z } from "zod";

export const createTicketSchema = z.object({
  clientName: z.string().min(3, "Nome do cliente deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  priority: z.enum(["Urgente", "Média", "Baixa"], {
    message: "Selecione uma prioridade",
  }),
  responsible: z.string().min(3, "Responsável deve ter no mínimo 3 caracteres"),
  subject: z.string().min(10, "Assunto deve ter no mínimo 10 caracteres"),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
