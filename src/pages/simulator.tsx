"use client";

import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useSimulator } from "@/hooks/use-simulator";
import { useSimulatorState } from "@/hooks/use-simulator-state";
import { calcPlanValue } from "@/components/lib/utils";
import { Card } from "@/components/ui/card";
import { AdditionalCoverages } from "@/components/simulator/additional-coverages";
import { Sliders } from "@/components/simulator/sliders";
import { IndicatorCard } from "@/components/simulator/indicator-card";
import { SimulatorSkeleton } from "@/components/simulator/simulator-skeleton";
import { AlertCircle } from "lucide-react";

export default function SimulatorPage() {
  const { t } = useTranslation("common");
  const { data, loading, error } = useSimulator();

  const {
    vehicleValue,
    setVehicleValue,
    clientAge,
    setClientAge,
    coverages,
    setCoverages,
    selectedPlan,
    setSelectedPlan,
  } = useSimulatorState();

  if (error) {
    return (
      <>
        <Head>
          <title>{t("simulator.title")} | Nortus</title>
        </Head>
        <main className="flex flex-col items-center justify-center min-h-[60vh]">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t("simulator.errors.loadError")}
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            {t("simulator.errors.loadErrorMessage")}
          </p>
        </main>
      </>
    );
  }

  if (loading || !data) {
    return (
      <>
        <Head>
          <title>{t("simulator.title")} | Nortus</title>
        </Head>
        <SimulatorSkeleton />
      </>
    );
  }

  const { includedBenefits, plansIndicators } = data;

  const updatedPlans = plansIndicators.map((plan) => ({
    ...plan,
    totalValue: calcPlanValue(plan.value, coverages),
  }));

  return (
    <>
      <Head>
        <title>{t("simulator.title")} | Nortus</title>
      </Head>

      <main className="flex gap-10">
        <div className="flex-1 flex flex-col gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-5 text-foreground">
              {t("simulator.plans.title")}
            </h2>

            <div className="grid grid-cols-3 gap-6">
              {updatedPlans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`
                    relative cursor-pointer p-6 rounded-2xl transition-all duration-300
                    ${
                      selectedPlan === plan.name
                        ? "border-2 border-[#1876D2] bg-secondary/60 shadow-[0_0_20px_rgba(24,118,210,0.25)]"
                        : "border border-border bg-secondary/40 hover:bg-secondary/60"
                    }
                  `}
                >
                  {plan.name === "Premium" && (
                    <span className="absolute top-3 right-4 bg-[#43D2CB] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {t("simulator.plans.recommended")}
                    </span>
                  )}

                  <p className="text-muted-foreground text-sm">
                    {t(`simulator.plans.${plan.name.toLowerCase()}`)}
                  </p>
                  <p className="text-3xl font-bold mt-2 text-foreground">
                    R$ {plan.totalValue.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {t("simulator.plans.perMonth")}
                  </p>
                </div>
              ))}
            </div>

            <Sliders
              vehicleValue={vehicleValue}
              setVehicleValue={setVehicleValue}
              clientAge={clientAge}
              setClientAge={setClientAge}
            />

            <AdditionalCoverages coverages={coverages} setCoverages={setCoverages} />
          </Card>
        </div>

        <div className="w-[380px] flex flex-col gap-8">
          <Card className="px-6 py-8">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {t("simulator.benefits.title")}
            </h3>

            <div className="flex flex-wrap gap-3">
              {includedBenefits?.map((benefit) => (
                <span
                  key={benefit}
                  className="bg-secondary/60 border border-border text-xs text-foreground px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-[#1876D2] rounded-full" />
                  {t(`simulator.benefits.${benefit}`)}
                </span>
              ))}
            </div>
          </Card>

          <Card className="px-6 py-8">
            <h3 className="text-lg font-semibold mb-5 text-foreground">
              {t("simulator.indicators.title")}
            </h3>

            <div className="flex flex-col gap-4">
              {updatedPlans.map((plan) => (
                <IndicatorCard
                  key={plan.name}
                  name={plan.name}
                  conversion={plan.conversion}
                  roi={plan.roi}
                  value={plan.totalValue}
                />
              ))}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}

SimulatorPage.pageTitleKey = "simulator.title";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};
