import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { DynamicNavbar } from "@/components/layout/dynamic-navbar";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "@/components/theme-provider";

// Páginas públicas que NÃO devem ter Sidebar/Navbar
const publicRoutes = ["/login", "/"];

type PageWithLayout = NextPage & {
  pageTitleKey?: string;
  actionButton?: ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  useEffect(() => {
    useAuthStore.getState().loadFromStorage();
  }, []);

  // Se for rota pública (login), renderiza sem layout
  if (isPublicRoute) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Sidebar />
          <DynamicNavbar titleKey={Component.pageTitleKey} actionButton={Component.actionButton} />

          <main className="ml-20 mt-20 min-h-[calc(100vh-5rem)] p-8">
            <Component {...pageProps} />
          </main>
        </div>
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
