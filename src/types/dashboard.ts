export interface KPIChartData {
  labels: string[];
  arpu: number[];
  conversion: number[];
  churn: number[];
  retention: number[];
}

export interface DashboardKPIs {
  arpu: {
    current: number;
    change: number;
  };
  retention: {
    current: number;
    change: number;
  };
  churn: {
    current: number;
    change: number;
  };
  conversion: {
    current: number;
    change: number;
  };
}

export interface DashboardAPIResponse {
  kpisTrend: {
    labels: string[];
    arpuTrend: {
      name: string;
      data: number[];
    };
    conversionTrend: {
      name: string;
      data: number[];
    };
    churnTrend: {
      name: string;
      data: number[];
    };
    retentionTrend: {
      name: string;
      data: number[];
    };
  };
  kpisResume: {
    arpu: {
      valor: number;
      variacao: number;
    };
    conversion: {
      valor: number;
      variacao: number;
    };
    retention: {
      valor: number;
      variacao: number;
    };
    churn: {
      valor: number;
      variacao: number;
    };
  };
  segments: Array<{
    nome: string;
    valor: number;
  }>;
  activeClients: {
    filters: {
      status: string[];
      secureType: string[];
      locations: string[];
    };
    data: Array<{
      id: string;
      name: string;
      email: string;
      secureType: string;
      monthValue: number;
      status: string;
      renewalDate: string;
      location: string;
    }>;
  };
}
