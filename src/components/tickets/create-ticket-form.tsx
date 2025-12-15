"use client";

import { useTranslation } from "next-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/components/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTicketInput, createTicketSchema } from "@/schema/create-ticket.schema";
import { useTicketsStore } from "@/store/tickets.store";

type Props = {
  onSuccess?: () => void;
  ticketToEdit?: {
    id: string;
    client: string;
    email: string;
    priority: "Urgente" | "Média" | "Baixa";
    responsible: string;
    subject: string;
  };
};

export function CreateTicketForm({ onSuccess, ticketToEdit }: Props) {
  const { t } = useTranslation("common");
  const addTicket = useTicketsStore((state) => state.addTicket);
  const updateTicket = useTicketsStore((state) => state.updateTicket);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateTicketInput>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: ticketToEdit
      ? {
          clientName: ticketToEdit.client,
          email: ticketToEdit.email,
          priority: ticketToEdit.priority,
          responsible: ticketToEdit.responsible,
          subject: ticketToEdit.subject,
        }
      : undefined,
  });

  const onSubmit = handleSubmit((values) => {
    if (ticketToEdit) {
      updateTicket(ticketToEdit.id, {
        client: values.clientName,
        email: values.email,
        priority: values.priority,
        responsible: values.responsible,
        subject: values.subject,
      });
    } else {
      addTicket({
        client: values.clientName,
        email: values.email,
        priority: values.priority,
        responsible: values.responsible,
        subject: values.subject,
      });
    }
    reset();
    onSuccess?.();
  });

  const selectedPriority = watch("priority");

  const fieldBase =
    "bg-secondary text-foreground placeholder:text-muted-foreground/70 border border-border focus:ring-1 focus:ring-accent transition-all rounded-full";

  const errorText = "text-[11px] text-rose-400 font-medium leading-tight min-h-[16px] mt-0.5";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5" id="add-ticket">
      <div className="flex flex-col">
        <Label htmlFor="clientName" className="text-sm font-medium text-primary-foreground mb-1">
          {t("tickets.form.clientName")}
        </Label>
        <Input
          id="clientName"
          placeholder={t("tickets.form.clientNamePlaceholder")}
          {...register("clientName")}
          className={fieldBase}
        />
        <span className={errorText}>{errors.clientName?.message || ""}</span>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="email" className="text-sm font-medium text-primary-foreground mb-1">
          {t("tickets.form.email")}
        </Label>
        <Input
          id="email"
          placeholder={t("tickets.form.emailPlaceholder")}
          {...register("email")}
          className={fieldBase}
        />
        <span className={errorText}>{errors.email?.message || ""}</span>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="priority" className="text-sm font-medium text-primary-foreground mb-1">
          {t("tickets.form.priority")}
        </Label>
        <Select
          value={selectedPriority}
          onValueChange={(value) =>
            setValue("priority", value as CreateTicketInput["priority"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className={cn(fieldBase, "rounded-full")}>
            <SelectValue placeholder={t("tickets.form.priorityPlaceholder")} />
          </SelectTrigger>
          <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
            <SelectItem value="Urgente">{t("tickets.priorities.urgent")}</SelectItem>
            <SelectItem value="Média">{t("tickets.priorities.medium")}</SelectItem>
            <SelectItem value="Baixa">{t("tickets.priorities.low")}</SelectItem>
          </SelectContent>
        </Select>
        <span className={errorText}>{errors.priority?.message || ""}</span>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="responsible" className="text-sm font-medium text-primary-foreground mb-1">
          {t("tickets.form.responsible")}
        </Label>
        <Input
          id="responsible"
          placeholder={t("tickets.form.responsiblePlaceholder")}
          {...register("responsible")}
          className={fieldBase}
        />
        <span className={errorText}>{errors.responsible?.message || ""}</span>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="subject" className="text-sm font-medium text-primary-foreground mb-1">
          {t("tickets.form.subject")}
        </Label>
        <textarea
          id="subject"
          placeholder={t("tickets.form.subjectPlaceholder")}
          {...register("subject")}
          className={cn(fieldBase, "min-h-[100px] resize-none rounded-xl px-4 py-3 text-sm")}
        />
        <span className={errorText}>{errors.subject?.message || ""}</span>
      </div>
    </form>
  );
}
