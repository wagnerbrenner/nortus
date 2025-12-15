import { create } from "zustand";
import type { Ticket } from "@/types/ticket";

interface TicketsState {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
  responsibleFilter: string;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  setTickets: (tickets: Ticket[]) => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setPriorityFilter: (priority: string) => void;
  setResponsibleFilter: (responsible: string) => void;
  filterTickets: () => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  addTicket: (
    ticket: Omit<Ticket, "id" | "ticketId" | "status" | "createdAt" | "updatedAt">
  ) => void;
  updateTicket: (
    id: string,
    ticket: Omit<Ticket, "id" | "ticketId" | "status" | "createdAt" | "updatedAt">
  ) => void;
}

export const useTicketsStore = create<TicketsState>((set, get) => ({
  tickets: [],
  filteredTickets: [],
  searchTerm: "",
  statusFilter: "Todos",
  priorityFilter: "Todos",
  responsibleFilter: "Todos",
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,

  setTickets: (tickets) => {
    set({ tickets, filteredTickets: tickets });
    get().filterTickets();
  },

  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority, currentPage: 1 }),
  setResponsibleFilter: (responsible) => set({ responsibleFilter: responsible, currentPage: 1 }),

  filterTickets: () => {
    const { tickets, searchTerm, statusFilter, priorityFilter, responsibleFilter, pageSize } =
      get();

    let filtered = [...tickets];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.ticketId?.toLowerCase().includes(search) ||
          ticket.client?.toLowerCase().includes(search) ||
          ticket.subject?.toLowerCase().includes(search) ||
          ticket.email?.toLowerCase().includes(search)
      );
    }

    if (statusFilter !== "Todos") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    if (priorityFilter !== "Todos") {
      filtered = filtered.filter((ticket) => ticket.priority === priorityFilter);
    }

    if (responsibleFilter !== "Todos") {
      filtered = filtered.filter((ticket) => ticket.responsible === responsibleFilter);
    }

    const totalPages = Math.ceil(filtered.length / pageSize);

    set({ filteredTickets: filtered, totalPages });
  },

  nextPage: () => {
    const { currentPage, totalPages } = get();
    if (currentPage < totalPages) {
      set({ currentPage: currentPage + 1 });
    }
  },

  prevPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
    }
  },

  firstPage: () => set({ currentPage: 1 }),

  lastPage: () => {
    const { totalPages } = get();
    set({ currentPage: totalPages });
  },

  addTicket: (ticketData) => {
    const { tickets } = get();
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      ticketId: `TK${Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0")}`,
      status: "Aberto",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...ticketData,
    };

    set({ tickets: [newTicket, ...tickets] });
    get().filterTickets();
  },

  updateTicket: (id, ticketData) => {
    const { tickets } = get();
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id
        ? {
            ...ticket,
            ...ticketData,
            updatedAt: new Date().toISOString(),
          }
        : ticket
    );

    set({ tickets: updatedTickets });
    get().filterTickets();
  },
}));
