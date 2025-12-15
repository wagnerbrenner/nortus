import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("dashboard.title")} | Nortus</title>
      </Head>
      <DashboardContent />
    </>
  );
}

// Definir título da página para o Navbar
DashboardPage.pageTitleKey = "dashboard.title";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};
