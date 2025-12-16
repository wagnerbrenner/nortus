import { Slider } from "@/components/ui/slider";

interface SlidersProps {
  vehicleValue: number;
  setVehicleValue: (value: number) => void;
  clientAge: number;
  setClientAge: (value: number) => void;
}

export function Sliders({ vehicleValue, setVehicleValue, clientAge, setClientAge }: SlidersProps) {
  return (
    <div className="mt-4 flex flex-col gap-8">
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Valor do veículo:{" "}
          <strong className="text-foreground">R$ {vehicleValue.toLocaleString()}</strong>
        </p>

        <Slider
          min={10000}
          max={500000}
          step={1000}
          value={[vehicleValue]}
          onValueChange={(value) => setVehicleValue(value[0])}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>R$ 10.000</span>
          <span>R$ 500.000</span>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Idade do Cliente: <strong className="text-foreground">{clientAge} anos</strong>
        </p>

        <Slider
          min={18}
          max={90}
          step={1}
          value={[clientAge]}
          onValueChange={(value) => setClientAge(value[0])}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>18 anos</span>
          <span>90 anos</span>
        </div>
      </div>
    </div>
  );
}
