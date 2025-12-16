import { useTranslation } from "react-i18next";

interface IndicatorCardProps {
  name: "basico" | "intermediario" | "premium";
  conversion: number;
  roi: number;
  value: number;
}

export function IndicatorCard({ name, conversion, roi, value }: IndicatorCardProps) {
  const { t } = useTranslation("common");

  return (
    <div className="bg-secondary/40 border border-border rounded-xl p-5 flex justify-between items-center hover:bg-secondary/60 transition-colors">
      <div>
        <p className="text-foreground font-semibold">{t(`simulator.plansIndicators.${name}`)}</p>

        <p className="text-xs text-muted-foreground mt-1">
          {t("simulator.indicators.conversion")}:{" "}
          <span className="text-green-500 font-medium">{conversion}%</span>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          {t("simulator.indicators.roi")}:{" "}
          <span className="text-green-500 font-medium">{roi}%</span>
        </p>
      </div>

      <p className="text-xl font-bold text-foreground">
        {t("simulator.currency")} {value.toFixed(2)}
      </p>
    </div>
  );
}
