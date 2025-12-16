"use client";

import { useQuery } from "@tanstack/react-query";
import { simulatorService } from "@/services/simulator.service";

export function useSimulator() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["simulator-data"],
    queryFn: simulatorService.getSimulatorData,
  });

  return {
    data,
    loading: isLoading,
    error,
  };
}
