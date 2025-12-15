import { api } from "./api";
import { DashboardKPIs, KPIChartData, DashboardAPIResponse } from "@/types/dashboard";

export const dashboardService = {
  getDashboardData: async (): Promise<{ kpis: DashboardKPIs; chartData: KPIChartData }> => {
    const response = await api.get<DashboardAPIResponse>("/nortus-v1/dashboard");

    const data = response.data;

    const kpis: DashboardKPIs = {
      arpu: {
        current: data.kpisResume.arpu.valor,
        change: data.kpisResume.arpu.variacao,
      },
      retention: {
        current: data.kpisResume.retention.valor,
        change: data.kpisResume.retention.variacao,
      },
      churn: {
        current: data.kpisResume.churn.valor,
        change: data.kpisResume.churn.variacao,
      },
      conversion: {
        current: data.kpisResume.conversion.valor,
        change: data.kpisResume.conversion.variacao,
      },
    };

    const chartData: KPIChartData = {
      labels: data.kpisTrend.labels,
      arpu: data.kpisTrend.arpuTrend.data,
      conversion: data.kpisTrend.conversionTrend.data,
      churn: data.kpisTrend.churnTrend.data,
      retention: data.kpisTrend.retentionTrend.data,
    };

    return { kpis, chartData };
  },
};
