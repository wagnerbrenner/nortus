"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "@/hooks/use-login";
import { loginSchema, LoginSchema } from "src/schema/login.schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const login = useLogin();

  const onSubmit = (data: LoginSchema) => {
    login.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-md mt-12 ">
      <fieldset>
        <h2 className="text-2xl font-semibold text-primary mb-1">Login</h2>
        <p className="text-muted-foreground text-sm">
          Entre com suas credenciais para acessar a sua conta.
        </p>
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <Input id="user" placeholder="Usuário" required {...register("email")} />

        {errors.email ? (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        ) : (
          <p className="text-muted-foreground text-xs mt-1">
            Insira o seu e-mail, CPF ou passaporte.
          </p>
        )}
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <Label htmlFor="password">Senha</Label>
        <fieldset className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            required
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-transparent absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </fieldset>
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
      </fieldset>
      <fieldset className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox id="remember" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <Label htmlFor="remember" className="cursor-pointer">
            Lembrar meu usuário
          </Label>
        </div>
        <Link
          href="#"
          className="text-[#1876D2] hover:underline hover:text-[#1876D2]/90 transition-colors"
        >
          Esqueci minha senha
        </Link>
      </fieldset>
      <Button
        type="submit"
        disabled={login.isPending}
        className="w-full h-12 mt-2 rounded-lg bg-[#1876D2] text-white font-medium hover:bg-[#1876D2]/90 disabled:opacity-50 transition-all"
      >
        {login.isPending ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            <span>Entrando...</span>
          </div>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
}
