"use client";
import { ReactNode } from "react";

type NavbarProps = {
  title: string;
  actionButton?: ReactNode;
};

export function Navbar({ title, actionButton }: NavbarProps) {
  return (
    <header className="fixed top-0 w-full h-20 bg-sidebar border-b border-sidebar-border flex items-center justify-between pl-26 pr-14 z-40">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      {actionButton && <div>{actionButton}</div>}
    </header>
  );
}
