"use client";

import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateTicketForm } from "./create-ticket-form";
import { PencilLineIcon } from "lucide-react";
import type { Ticket } from "@/types/ticket";

type Props = {
  ticket: Ticket;
};

export function EditTicketButton({ ticket }: Props) {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-primary hover:text-primary/80 hover:bg-primary/10"
        >
          <span className="text-sm font-medium text-primary-foreground">
            {t("tickets.actions.edit")}
          </span>
          <PencilLineIcon size={12} />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md bg-background border border-border rounded-2xl p-6 shadow-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="space-y-1 flex-shrink-0">
          <DialogTitle className="text-lg font-semibold text-primary">
            {t("tickets.dialog.edit.title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            {t("tickets.dialog.edit.description")} {ticket.ticketId}.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 pr-2 -mr-2">
          <CreateTicketForm
            onSuccess={() => setIsOpen(false)}
            ticketToEdit={{
              id: ticket.id,
              client: ticket.client,
              email: ticket.email,
              priority: ticket.priority,
              responsible: ticket.responsible,
              subject: ticket.subject,
            }}
          />
        </div>

        <DialogFooter className="flex-shrink-0 mt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-6 text-foreground bg-transparent border border-border hover:bg-secondary/50 transition-colors"
            >
              {t("tickets.dialog.buttons.cancel")}
            </Button>
          </DialogClose>

          <Button
            form="add-ticket"
            type="submit"
            className="rounded-full px-6 bg-accent text-white shadow-(--shadow-accent) hover:bg-accent/80 transition-all"
          >
            {t("tickets.dialog.buttons.update")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
