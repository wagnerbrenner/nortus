import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout, loadFromStorage } = useAuthStore();

  useEffect(() => {
    loadFromStorage();

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router, loadFromStorage]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard | Nortus</title>
      </Head>
      <div className="min-h-screen bg-background p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            {user && <p className="text-muted-foreground mt-2">Bem-vindo, {user.name}!</p>}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90 transition"
          >
            Sair
          </button>
        </div>
        <p className="text-muted-foreground">Você está autenticado no Nortus!</p>
      </div>
    </>
  );
}
