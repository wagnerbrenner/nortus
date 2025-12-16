import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export default function DashboardPage() {
  const { t } = useTranslation("common");
  const { isLoading } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: dashboardService.getDashboardData,
  });

  return (
    <>
      <Head>
        <title>{t("dashboard.title")} | Nortus</title>
      </Head>
      {isLoading ? <DashboardSkeleton /> : <DashboardContent />}
    </>
  );
}

DashboardPage.pageTitleKey = "dashboard.title";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};
