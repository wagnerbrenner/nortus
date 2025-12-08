"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { authService } from "../services/login.service";
import { useAuthStore } from "@/store/auth.store";

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      setAuth(data.token, data.username);

      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const status = error.response?.status;

      if (status === 400) {
        toast.error("Dados inválidos. Verifique os campos e tente novamente.");
      } else if (status === 401) {
        toast.error("E-mail ou senha incorretos.");
      } else {
        toast.error("Falha ao autenticar. Tente novamente mais tarde.");
      }
    },
  });
}
