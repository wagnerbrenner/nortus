"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/components/lib/utils";
import { Search, AlertCircle, ArrowUpAzIcon, ArrowDownAZIcon } from "lucide-react";
import { useTickets } from "@/hooks/use-tickets";
import type { Ticket } from "@/types/ticket";

const getStatusClass = (status: string) => {
  switch (status) {
    case "Aberto":
      return "bg-blue-500/20 text-blue-300 border-blue-600/30";
    case "Em Progresso":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-600/30";
    case "Pendente":
      return "bg-orange-500/20 text-orange-300 border-orange-600/30";
    case "Resolvido":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-600/30";
    case "Fechado":
      return "bg-gray-500/20 text-gray-300 border-gray-600/30";
    default:
      return "bg-secondary text-foreground border-border/40";
  }
};

export function ClientsTable() {
  const { t } = useTranslation("common");
  const { data: tickets, isLoading, error } = useTickets();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [priorityFilter, setPriorityFilter] = useState("Todos");
  const [isAscending, setIsAscending] = useState(true);

  const statuses = ["Todos", "Aberto", "Em Progresso", "Pendente", "Resolvido", "Fechado"];
  const priorities = ["Todos", "Baixa", "Média", "Alta", "Urgente"];

  const filteredTickets = useMemo(() => {
    if (!tickets) return [];
    const search = searchTerm.trim().toLowerCase();
    return tickets
      .filter((ticket) => {
        const matchesSearch =
          search === "" ||
          ticket.subject?.toLowerCase().includes(search) ||
          ticket.client?.toLowerCase().includes(search) ||
          ticket.email?.toLowerCase().includes(search) ||
          ticket.ticketId?.toLowerCase().includes(search);
        const matchesStatus = statusFilter === "Todos" || ticket.status === statusFilter;
        const matchesPriority = priorityFilter === "Todos" || ticket.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        const subjectA = a.subject || "";
        const subjectB = b.subject || "";
        return isAscending ? subjectA.localeCompare(subjectB) : subjectB.localeCompare(subjectA);
      });
  }, [tickets, searchTerm, statusFilter, priorityFilter, isAscending]);

  const columns = useMemo(() => {
    return [
      {
        key: "subject",
        header: (
          <span
            onClick={() => setIsAscending((prev) => !prev)}
            className="flex items-center gap-1 cursor-pointer select-none"
          >
            {t("dashboard.clients.name")}
            {isAscending ? <ArrowUpAzIcon size={12} /> : <ArrowDownAZIcon size={12} />}
          </span>
        ),
        render: (ticket: Ticket) => (
          <div className="flex flex-col">
            <span className="text-foreground font-medium">{ticket.client}</span>
            <span className="text-muted-foreground text-xs">{ticket.email}</span>
          </div>
        ),
      },
      {
        key: "priority",
        header: t("dashboard.clients.secureType"),
        render: (ticket: Ticket) => ticket.priority,
      },
      {
        key: "responsible",
        header: t("dashboard.clients.monthValue"),
        render: (ticket: Ticket) => ticket.responsible || "-",
      },
      {
        key: "status",
        header: t("dashboard.clients.status"),
        render: (ticket: Ticket) => (
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium",
              getStatusClass(ticket.status)
            )}
          >
            {ticket.status}
          </span>
        ),
      },
      {
        key: "createdAt",
        header: t("dashboard.clients.renewalDate"),
        render: (ticket: Ticket) => new Date(ticket.createdAt).toLocaleDateString("pt-BR"),
      },
      {
        key: "updatedAt",
        header: t("dashboard.clients.region"),
        render: (ticket: Ticket) => new Date(ticket.updatedAt).toLocaleDateString("pt-BR"),
      },
    ];
  }, [t, isAscending]);

  if (error) {
    return (
      <Card className="bg-secondary/40 border border-zinc-800 rounded-3xl p-6 shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Erro ao carregar tickets</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Não foi possível carregar os tickets. Tente novamente mais tarde.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-secondary/40 border border-zinc-800 rounded-3xl p-6 shadow-lg">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-semibold">{t("dashboard.clients.title")}</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder={t("dashboard.clients.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 bg-transparent border border-border/40 text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter} disabled={isLoading}>
            <SelectTrigger className="w-[180px] h-10 bg-transparent border border-border/40 text-foreground">
              <SelectValue placeholder={t("dashboard.clients.allStatuses")} />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === "Todos" ? t("dashboard.clients.allStatuses") : status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter} disabled={isLoading}>
            <SelectTrigger className="w-[180px] h-10 bg-transparent border border-border/40 text-foreground">
              <SelectValue placeholder={t("dashboard.clients.allTypes")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">{t("dashboard.clients.allTypes")}</SelectItem>
              {priorities
                .filter((p) => p !== "Todos")
                .map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-muted-foreground">Carregando tickets...</div>
          </div>
        ) : (
          <DataTable columns={columns} data={filteredTickets} />
        )}
      </CardContent>
    </Card>
  );
}
