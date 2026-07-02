"use client";

import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MEDICINES_API = "http://localhost:5500/medicines";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

export default function Plans() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(MEDICINES_API);
      const data = response.ok ? await response.json() : [];

      setMedicines(Array.isArray(data) ? data : []);
    } catch {
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(fetchMedicines);
  }, [fetchMedicines]);

  return (
    <div className="flex flex-col gap-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold">Remedios</h1>
        <p className="mt-2 text-muted-foreground">
          Remedios disponiveis para cadastro e uso no sistema. Escolha o
          medicamento que melhor se adapta as suas necessidades.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">Medicamentos cadastrados</h2>
          <p className="text-sm text-muted-foreground">
            Produtos cadastrados no dashboard aparecem aqui.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : medicines.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum medicamento cadastrado ainda.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {medicines.map((medicine) => (
              <article
                key={medicine.id}
                className="rounded-xl border bg-background p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{medicine.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Codigo: {medicine.code}
                    </p>
                  </div>
                  <span className="rounded-md border px-2 py-1 text-xs">
                    Risco {medicine.riskLevel}
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-1 text-sm">
                  <span>{formatCurrency(medicine.price)}</span>
                  {medicine.ondeTem && (
                    <span className="text-muted-foreground">
                      Onde tem: {medicine.ondeTem}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
