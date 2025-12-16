"use client";

import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { TicketsActionButton } from "@/components/tickets/tickets-action-button";
import { StatusCard } from "@/components/tickets/status-card";
import { TicketsTable } from "@/components/tickets/tickets-table";
import { useTickets } from "@/hooks/use-tickets";
import { AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { TicketsSkeleton } from "@/components/tickets/tickets-skeleton";

export default function TicketsPage() {
  const { t } = useTranslation("common");
  const { data: tickets, isLoading, error } = useTickets();

  const ticketStats = useMemo(() => {
    if (!tickets) return { open: 0, inProgress: 0, solved: 0, timeAverageHours: "0h" };

    const open = tickets.filter((t) => t.status === "Aberto").length;
    const inProgress = tickets.filter((t) => t.status === "Em andamento").length;
    const resolved = tickets.filter((t) => t.status === "Resolvido").length;

    return {
      open,
      inProgress,
      solved: resolved,
      timeAverageHours: "2h 30m",
    };
  }, [tickets]);

  const statuses = ["Aberto", "Em andamento", "Pendente", "Resolvido", "Fechado"];
  const priorities = ["Urgente", "Média", "Baixa"];

  if (error) {
    return (
      <>
        <Head>
          <title>{t("tickets.title")} | Nortus</title>
        </Head>
        <main className="flex flex-col items-center justify-center min-h-[60vh]">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t("tickets.errors.loadError")}
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            {t("tickets.errors.loadErrorMessage")}
          </p>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{t("tickets.title")} | Nortus</title>
        </Head>
        <TicketsSkeleton />
      </>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <>
        <Head>
          <title>{t("tickets.title")} | Nortus</title>
        </Head>
        <main className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">{t("tickets.errors.noTickets")}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t("tickets.title")} | Nortus</title>
      </Head>
      <main className="space-y-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard
            icon="/icon/open-ticket.svg"
            title={t("tickets.stats.open")}
            value={ticketStats.open}
          />
          <StatusCard
            icon="/icon/pending-ticket.svg"
            title={t("tickets.stats.inProgress")}
            value={ticketStats.inProgress}
          />
          <StatusCard
            icon="/icon/done-ticket.svg"
            title={t("tickets.stats.resolved")}
            value={ticketStats.solved}
          />
          <StatusCard
            icon="/icon/temp-ticket.svg"
            title={t("tickets.stats.avgTime")}
            value={ticketStats.timeAverageHours}
          />
        </section>

        <section>
          <TicketsTable tickets={tickets} statuses={statuses} priorities={priorities} />
        </section>
      </main>
    </>
  );
}

TicketsPage.pageTitleKey = "tickets.title";
TicketsPage.actionButton = <TicketsActionButton />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};
