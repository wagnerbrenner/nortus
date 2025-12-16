import { Coverages } from "@/types/simulator";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

interface AdditionalCoveragesProps {
  coverages: Coverages;
  setCoverages: (updater: (prev: Coverages) => Coverages) => void;
}

export function AdditionalCoverages({ coverages, setCoverages }: AdditionalCoveragesProps) {
  function toggle(name: keyof Coverages) {
    setCoverages((prev) => ({ ...prev, [name]: !prev[name] }));
  }
  const { t } = useTranslation("common");

  const items = [
    { key: "rouboFurto", label: t("simulator.coverages.theft"), price: 25 },
    { key: "colisao", label: t("simulator.coverages.collision"), price: 35 },
    { key: "incendio", label: t("simulator.coverages.fire"), price: 20 },
    { key: "fenomenos", label: t("simulator.coverages.naturalPhenomena"), price: 30 },
  ];

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-4 text-foreground">Coberturas Adicionais</h3>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <label key={item.key} className="flex justify-between items-center cursor-pointer group">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={coverages[item.key as keyof Coverages]}
                onCheckedChange={() => toggle(item.key as keyof Coverages)}
              />
              <span className="text-sm text-foreground group-hover:text-[#1876D2] transition-colors">
                {item.label}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">+ R$ {item.price.toFixed(2)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
