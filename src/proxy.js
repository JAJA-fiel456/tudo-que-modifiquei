// frontend\src\proxy.js
import { NextResponse } from "next/server";

// Lista de rotas que precisam de login
const rotasPrivadas = ["/dashboard", "/links"];

// Lista de rotas que NÃO devem ser acessadas se já estiver logado
const rotasDeAuth = ["/login", "/register"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Verifica a sessão perguntando ao backend
  let session = null;

  try {
    const sessionResponse = await fetch(
      "http://127.0.0.1:5500/api/auth/get-session",
      {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      },
    );

    if (sessionResponse.ok) {
      session = await sessionResponse.json();
    }
  } catch (error) {
    console.error("Falha ao verificar sessao:", error);
  }
  const estaLogado = !!session?.user;

  // Se não está logado e tenta acessar rota privada → manda pro login
  if (!estaLogado && rotasPrivadas.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se já está logado e tenta acessar login/register → manda pro dashboard
  if (estaLogado && rotasDeAuth.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Define em quais rotas o middleware roda
export const config = {
  matcher: ["/dashboard/:path*", "/relatorio/:path*", "/login", "/register"],
};