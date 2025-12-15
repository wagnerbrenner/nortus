import Head from "next/head";
import { LoginForm } from "@/components/login/login-form";
import { LoginHeader } from "@/components/login/login-header";
import { LoginHero } from "@/components/login/login-hero";
import { LoginActions } from "@/components/login/login-actions";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Nortus | Login</title>
      </Head>
      <main className="min-h-screen min-w-[1000px] w-full flex flex-col lg:flex-row bg-background text-foreground px-4 sm:px-8 lg:px-16 py-6 gap-8 lg:gap-16 overflow-x-auto">
        <section className="flex flex-col w-full lg:w-1/2 min-w-[400px]">
          <LoginHeader />
          <LoginForm />
        </section>

        <section className="relative flex-1 w-full lg:w-1/2 min-w-[400px] min-h-[400px] lg:aspect-square bg-secondary flex items-center justify-center rounded-4xl overflow-hidden">
          <LoginActions />
          <LoginHero />
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};
