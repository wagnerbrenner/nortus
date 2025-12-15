"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { KPIChart } from "./kpi-chart";
import { ConversionChart } from "./conversion-chart";
import { ClientMap } from "./client-map";
import { AlertCircle } from "lucide-react";

export function DashboardContent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: dashboardService.getDashboardData,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-sidebar border border-sidebar-border rounded-2xl">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Erro ao carregar dados</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          <KPIChart
            data={
              data?.chartData ?? {
                labels: [],
                arpu: [],
                conversion: [],
                churn: [],
                retention: [],
              }
            }
            loading={isLoading}
          />
        </div>

        <div className="lg:col-span-4">
          <ConversionChart
            data={{
              labels: data?.chartData.labels ?? [],
              conversion: data?.chartData.conversion ?? [],
            }}
            loading={isLoading}
          />
        </div>
      </div>

      <ClientMap />
    </div>
  );
}
