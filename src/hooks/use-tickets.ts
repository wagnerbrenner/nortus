import { useQuery } from "@tanstack/react-query";
import { ticketService } from "@/services/ticket.service";

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: ticketService.getTickets,
  });
}
