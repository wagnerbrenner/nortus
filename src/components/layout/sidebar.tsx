"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Ticket, ChartLine, MessageSquareText, CalendarDays, User } from "lucide-react";
import { cn } from "@/components/lib/utils";
import Image from "next/image";
import { UserAvatarMenu } from "./user-avatar-menu";
import { useTranslation } from "next-i18next";

const menuItems = [
  {
    nameKey: "menu.dashboard",
    href: "/dashboard",
    icon: ChartLine,
  },
  {
    nameKey: "menu.tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    nameKey: "menu.chat",
    href: "/chat",
    icon: MessageSquareText,
  },
  {
    nameKey: "menu.profile",
    href: "/profile",
    icon: User,
  },
  {
    nameKey: "menu.simulator",
    href: "/simulador",
    icon: CalendarDays,
  },
];

export function Sidebar() {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center justify-between py-6 z-50 shadow-lg shadow-black/20 rounded-tr-2xl rounded-br-2xl">
      <div className="mb-20 flex items-center justify-center w-12 h-12">
        <Image
          src="/nortusLogoPage.png"
          alt="Nortus"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <nav className="flex-1 flex flex-col gap-4 w-full items-center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-sidebar-accent text-muted-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-foreground"
              )}
              title={t(item.nameKey)}
            >
              <Icon className="w-6 h-6" strokeWidth={2} />
            </Link>
          );
        })}
      </nav>
      <UserAvatarMenu />
    </aside>
  );
}
