"use client";

import { useState } from "react";
import { Coverages } from "@/types/simulator";

export function useSimulatorState() {
  const [vehicleValue, setVehicleValue] = useState(100000);
  const [clientAge, setClientAge] = useState(30);
  const [selectedPlan, setSelectedPlan] = useState("Intermediário");
  const [coverages, setCoverages] = useState<Coverages>({
    rouboFurto: false,
    colisao: false,
    incendio: false,
    fenomenos: false,
  });

  return {
    vehicleValue,
    setVehicleValue,
    clientAge,
    setClientAge,
    coverages,
    setCoverages,
    selectedPlan,
    setSelectedPlan,
  };
}
