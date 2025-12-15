"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { KPIChartData } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface KPIChartProps {
  data: KPIChartData;
  loading?: boolean;
}

const BUTTONS = [
  { key: "retention" as const },
  { key: "conversion" as const },
  { key: "churn" as const },
  { key: "arpu" as const },
];

type KPIType = "arpu" | "conversion" | "churn" | "retention";

export function KPIChart({ data, loading }: KPIChartProps) {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState<KPIType>("arpu");

  if (loading) {
    return (
      <div className="p-6 bg-sidebar border border-sidebar-border rounded-2xl animate-pulse">
        <div className="h-6 bg-sidebar-accent rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-sidebar-accent rounded"></div>
      </div>
    );
  }

  const seriesMap: Record<KPIType, { name: string; values: number[] }> = {
    arpu: { name: t("dashboard.kpis.buttons.arpu"), values: data.arpu },
    conversion: { name: t("dashboard.kpis.buttons.conversion"), values: data.conversion },
    churn: { name: t("dashboard.kpis.buttons.churn"), values: data.churn },
    retention: { name: t("dashboard.kpis.buttons.retention"), values: data.retention },
  };

  const chartData = seriesMap[selected];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#94a3b8",
      background: "transparent",
      fontFamily: "inherit",
    },
    xaxis: {
      categories: data.labels,
      labels: {
        style: { colors: "#94a3b8", fontSize: "12px" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#94a3b8", fontSize: "12px" },
        formatter: (val) => {
          if (selected === "arpu") {
            return ` ${Math.round(val / 1000)}`;
          }
          return `${val.toFixed(0)}`;
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#2DB3C8"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#2DB3C8",
            opacity: 0.4,
          },
          {
            offset: 100,
            color: "#2DB3C8",
            opacity: 0.1,
          },
        ],
      },
    },
    grid: {
      borderColor: "#1e293b",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => {
          if (selected === "arpu") {
            return `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
          }
          return `${val.toFixed(1)}%`;
        },
      },
      marker: { show: true },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
  };

  return (
    <div className="p-6 bg-sidebar border border-sidebar-border rounded-2xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-foreground">{t("dashboard.kpis.evolution")}</h2>
        <div className="flex gap-2 flex-wrap">
          {BUTTONS.map(({ key }) => (
            <Button
              key={key}
              onClick={() => setSelected(key)}
              variant="ghost"
              size="sm"
              className={
                selected === key
                  ? "bg-chart-active text-white shadow-lg shadow-chart-active/30 rounded-full px-4 pointer-events-none"
                  : "bg-transparent text-muted-foreground hover:bg-sidebar-accent/50 rounded-full px-4"
              }
            >
              {t(`dashboard.kpis.buttons.${key}`)}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <Chart
          options={options}
          series={[{ name: chartData.name, data: chartData.values }]}
          height="100%"
          type="area"
        />
      </div>
    </div>
  );
}
