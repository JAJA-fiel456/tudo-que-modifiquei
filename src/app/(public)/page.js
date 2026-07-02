import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Informacao clara",
    description:
      "Consulte dados essenciais sobre medicamentos, indicacoes e cuidados de uso.",
  },
  {
    title: "Acompanhamento seguro",
    description:
      "Organize informacoes importantes para apoiar conversas e decisoes com profissionais de saude.",
  },
  {
    title: "Conteudo atualizado",
    description:
      "Acesse uma experiencia pensada para promover saude e bem-estar com responsabilidade.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col gap-16 pb-16">
      <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden rounded-2xl">
        <Image
          src="/download5.jpg"
          alt="Profissional de saude em atendimento"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col justify-end gap-6 px-6 pb-14 pt-20 text-white sm:px-10 lg:px-14">
          <div className="w-fit rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium">
            Plataforma de apoio a saude
          </div>
          <div className="flex max-w-4xl flex-col gap-4">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Cuidando da sua saúde com confiança
            </h1>
            <p className="max-w-4xl text-base font-medium leading-8 text-white/90 sm:text-xl">
              Nossa plataforma foi desenvolvida para conectar pacientes e
              profissionais da saúde, oferecendo acesso fácil a informações
              sobre medicamentos, indicações, cuidados de uso e acompanhamento
              médico. Aqui, você encontra conteúdos atualizados para auxiliar na
              promoção da saúde e do bem-estar, sempre com responsabilidade e
              segurança.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <Link href="/plans">Ver remedios</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent text-white hover:bg-white hover:text-black"
            >
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 px-1 sm:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="rounded-lg">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-1.5 w-16 rounded-full bg-red-600" />
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
