"use client";
import { ReactNode } from "react";
import { useTranslation } from "next-i18next";
import { Navbar } from "./navbar";

type DynamicNavbarProps = {
  titleKey?: string;
  actionButton?: ReactNode;
};

export function DynamicNavbar({ titleKey, actionButton }: DynamicNavbarProps) {
  const { t } = useTranslation("common");

  const title = titleKey ? t(titleKey) : "";

  return <Navbar title={title} actionButton={actionButton} />;
}
