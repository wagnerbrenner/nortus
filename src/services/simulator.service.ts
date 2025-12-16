import { api } from "@/services/api";
import { SimulatorData } from "@/types/simulator";

export const simulatorService = {
  getSimulatorData: async (): Promise<SimulatorData> => {
    const response = await api.get("/nortus-v1/simulador-planos");
    return response.data;
  },
};
