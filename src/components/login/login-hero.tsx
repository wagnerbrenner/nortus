import Image from "next/image";

export function LoginHero() {
  return (
    <Image
      src={"/LoginPage.png"}
      alt="Ilustração de consultor atendendo cliente"
      fill
      className="object-cover rounded-4xl drop-shadow-2xl"
      priority
    />
  );
}
