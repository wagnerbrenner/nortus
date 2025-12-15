import { api } from "./api";
import type { Ticket, CreateTicketInput, UpdateTicketInput } from "@/types/ticket";

export const ticketService = {
  /**
   * POST /tickets - Create a new ticket
   */
  createTicket: async (input: CreateTicketInput): Promise<Ticket> => {
    const response = await api.post<{ data: Ticket }>("/tickets", input);

    return response.data.data;
  },

  /**
   * GET /tickets - List tickets
   */
  getTickets: async (): Promise<Ticket[]> => {
    const response = await api.get<{ data: Ticket[] }>("/tickets");

    return response.data.data;
  },

  /**
   * GET /tickets/{id} - Get ticket by ID
   */
  getTicketById: async (ticketId: string): Promise<Ticket> => {
    const response = await api.get<{ data: Ticket }>(`/tickets/${ticketId}`);

    return response.data.data;
  },

  /**
   * PATCH /tickets/{id} - Update ticket by ID
   */
  updateTicket: async (ticketId: string, input: UpdateTicketInput): Promise<Ticket> => {
    const response = await api.patch<{ data: Ticket }>(`/tickets/${ticketId}`, input);

    return response.data.data;
  },

  /**
   * DELETE /tickets/{id} - Performs a soft delete operation
   */
  deleteTicket: async (ticketId: string): Promise<void> => {
    await api.delete(`/tickets/${ticketId}`);
  },
};
