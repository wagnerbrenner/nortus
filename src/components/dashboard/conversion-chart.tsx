"use client";

import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { ChevronRight } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ConversionChartProps {
  data: {
    labels: string[];
    conversion: number[];
  };
  loading?: boolean;
}

export function ConversionChart({ data, loading }: ConversionChartProps) {
  const { t } = useTranslation("common");

  if (loading) {
    return (
      <div className="p-6 bg-sidebar border border-sidebar-border rounded-2xl animate-pulse">
        <div className="h-6 bg-sidebar-accent rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-sidebar-accent rounded"></div>
      </div>
    );
  }

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      foreColor: "#94a3b8",
      background: "transparent",
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "60%",
      },
    },
    fill: {
      type: "gradient",
      opacity: 0.9,
      gradient: {
        type: "vertical",
        shadeIntensity: 0.3,
        gradientToColors: ["#70d2f1"],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.6,
        stops: [0, 100],
      },
    },
    colors: ["#2DB3C8"],
    grid: {
      show: true,
      borderColor: "#1e293b",
      strokeDashArray: 4,
      position: "back",
      yaxis: {
        lines: { show: true },
      },
      xaxis: {
        lines: { show: false },
      },
    },
    xaxis: {
      categories: data.labels,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val} novos clientes`,
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  };

  const series = [
    {
      name: t("dashboard.conversion.label"),
      data: data.conversion,
    },
  ];

  return (
    <div className="p-6 bg-sidebar border border-sidebar-border rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">{t("dashboard.conversion.title")}</h2>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
      <Chart type="bar" height={300} options={options} series={series} />
    </div>
  );
}
