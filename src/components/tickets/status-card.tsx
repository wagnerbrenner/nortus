import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type StatusCardProps = {
  title: string;
  value: number | string;
  icon: string;
};

export function StatusCard({ title, value, icon }: StatusCardProps) {
  return (
    <Card className="rounded-xl gap-2 transition-all hover:scale-[1.02]">
      <CardHeader className="pb-2">
        <h3 className="text-md font-light text-muted-foreground">{title}</h3>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <span className="text-xl font-bold text-foreground">{value}</span>
        <Image src={icon} alt={title} width={24} height={24} />
      </CardContent>
    </Card>
  );
}
