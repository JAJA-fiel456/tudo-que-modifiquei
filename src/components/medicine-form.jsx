"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialForm = {
  name: "",
  price: "",
  code: "",
  ondeTem: "",
  riskLevel: "",
};

export default function MedicineForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const price = Number(form.price);
    const riskLevel = Number(form.riskLevel);

    if (!form.name.trim() || !form.code.trim()) {
      setError("Preencha o nome e o codigo do medicamento.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setError("Informe um preco valido.");
      return;
    }

    if (!Number.isInteger(riskLevel) || riskLevel < 1 || riskLevel > 5) {
      setError("O nivel de risco deve ser um numero de 1 a 5.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5500/medicines", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          price,
          code: form.code.trim(),
          ondeTem: form.ondeTem.trim() || null,
          riskLevel,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error || "Nao foi possivel cadastrar o medicamento.");
        return;
      }

      setForm(initialForm);
      setMessage("Medicamento cadastrado com sucesso. Ele ja aparece em Planos.");
    } catch {
      setError("Nao foi possivel conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Cadastrar medicamento</h1>
          <p className="text-sm text-muted-foreground">
            Preencha os dados do produto
          </p>
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {message && <p className="text-sm text-green-600 text-center">{message}</p>}

        <Field>
          <FieldLabel htmlFor="medicine-name">Nome</FieldLabel>
          <Input
            id="medicine-name"
            type="text"
            placeholder="Dipirona"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="medicine-price">Preco</FieldLabel>
          <Input
            id="medicine-price"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="12.90"
            required
            value={form.price}
            onChange={(event) => updateField("price", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="medicine-code">Codigo</FieldLabel>
          <Input
            id="medicine-code"
            type="text"
            placeholder="MED-001"
            required
            value={form.code}
            onChange={(event) => updateField("code", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="medicine-location">Onde tem</FieldLabel>
          <Input
            id="medicine-location"
            type="text"
            placeholder="Farmacia central"
            value={form.ondeTem}
            onChange={(event) => updateField("ondeTem", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="medicine-risk">Nivel de risco</FieldLabel>
          <Input
            id="medicine-risk"
            type="number"
            min="1"
            max="5"
            step="1"
            placeholder="1"
            required
            value={form.riskLevel}
            onChange={(event) => updateField("riskLevel", event.target.value)}
          />
          <FieldDescription>Use um valor de 1 a 5.</FieldDescription>
        </Field>

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar produto"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
