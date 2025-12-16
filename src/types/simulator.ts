export interface PlanIndicator {
  name: string;
  conversion: number;
  roi: number;
  value: number;
  totalValue?: number;
}

export interface SimulatorData {
  includedBenefits: string[];
  plansIndicators: PlanIndicator[];
}

export interface Coverages {
  rouboFurto: boolean;
  colisao: boolean;
  incendio: boolean;
  fenomenos: boolean;
}
