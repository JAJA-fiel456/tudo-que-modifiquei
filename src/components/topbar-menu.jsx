"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function TopbarMenu() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center gap-20 bg-background">
      <h1 className="text-5xl font-extrabold">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/download.png"
            alt="Logo MedKit"
            width={50}
            height={50}
            priority
            className="h-[50px] w-[50px]"
          />
          <span>MEDKIT</span>
        </Link>
      </h1>
      <nav className="flex w-full items-center justify-between">
        <div className="hidden gap-6 text-sm sm:flex">
          <Link href="/plans">Remedios</Link>
          <Separator orientation="vertical" />
          <Link href="/resources">Recursos</Link>
        </div>
        <div className="flex gap-7.5">
          <Link
            className="flex items-center rounded-md border px-2.5 text-sm"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="flex items-center rounded-md bg-primary px-2.5 text-sm text-primary-foreground"
            href="/register"
          >
            Cadastre-se
          </Link>
        </div>
      </nav>
    </header>
  );
}
