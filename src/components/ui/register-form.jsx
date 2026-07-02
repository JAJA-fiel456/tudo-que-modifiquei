"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(
          error.message || "Erro ao criar conta. Verifique os dados e tente novamente."
        );
        return;
      }

      router.push("/dashboard");
    } catch {
      setError(
        "Nao foi possivel conectar ao servidor. Verifique se o backend esta rodando."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="mb-10 flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Crie sua conta</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Preencha o formulario abaixo para criar sua conta
            </p>
          </div>

          {error && (
            <p className="mb-2 text-center text-sm text-red-500">{error}</p>
          )}

          <Field>
            <FieldLabel htmlFor="name">Nome completo</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FieldDescription>
              Deve ter pelo menos 8 caracteres.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirmar senha</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Field>
          <Field className="mt-10">
            <Button type="submit" disabled={loading}>
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </Field>
          <Field>
            <FieldDescription className="px-6 text-center">
              Ja tem uma conta? <Link href="/login">Login</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
