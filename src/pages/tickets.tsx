import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { TicketsActionButton } from "@/components/tickets/tickets-action-button";

export default function TicketsPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("tickets.title")} | Nortus</title>
      </Head>
      <div className="space-y-6">
        <p className="text-white text-lg">{t("tickets.title")}</p>
      </div>
    </>
  );
}

// Definir título e botão de ação para o Navbar
TicketsPage.pageTitleKey = "tickets.title";
TicketsPage.actionButton = <TicketsActionButton />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};
