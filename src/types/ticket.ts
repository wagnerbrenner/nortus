export type TicketStatus = "Aberto" | "Em Progresso" | "Pendente" | "Resolvido" | "Fechado";

export type TicketPriority = "Baixa" | "Média" | "Alta" | "Urgente";

export interface Ticket {
  id: string;
  ticketId: string;
  priority: TicketPriority;
  client: string;
  email: string;
  subject: string;
  status: TicketStatus;
  responsible: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  pending: number;
  resolved: number;
  closed: number;
  avgResolutionTime: number;
}

export interface TicketsAPIResponse {
  tickets: Ticket[];
  stats: TicketStats;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface CreateTicketInput {
  priority: TicketPriority;
  client: string;
  email: string;
  subject: string;
  responsible?: string;
}

export interface UpdateTicketInput {
  priority?: TicketPriority;
  client?: string;
  email?: string;
  subject?: string;
  status?: TicketStatus;
  responsible?: string;
}
