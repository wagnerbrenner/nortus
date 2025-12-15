"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslation } from "next-i18next";

export function TicketsActionButton() {
  const { t } = useTranslation("common");

  return (
    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
      <Plus className="w-4 h-4 mr-2" />
      {t("tickets.newTicket")}
    </Button>
  );
}
