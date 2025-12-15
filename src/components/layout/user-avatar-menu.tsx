"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { SelectLanguage } from "@/components/ui/select-language";
import { SelectTheme } from "@/components/ui/select-theme";
import { useTranslation } from "next-i18next";

export function UserAvatarMenu() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.getUser());
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 hover:opacity-80">
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarFallback className="bg-blue-500 text-white font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="end"
        className="w-56 p-2 bg-popover border border-border rounded-xl"
      >
        <div className="flex flex-col gap-1">
          <div className="px-4 py-3">
            <label className="text-xs text-muted-foreground mb-2 block">
              {t("userMenu.language")}
            </label>
            <SelectLanguage />
          </div>
          <div className="px-4 py-3">
            <label className="text-xs text-muted-foreground mb-2 block">
              {t("userMenu.theme")}
            </label>
            <SelectTheme />
          </div>

          <div className="px-4 py-3">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              {t("userMenu.logout")}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
