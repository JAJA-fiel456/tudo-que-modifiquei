import { Button } from "./button";
import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";

export default function PlanForm({
  editing,
  sheetOpen,
  setSheetOpen,
  form,
  setForm,
  error,
  saving,
  handleSubmit,
}) {
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{editing ? "Editar Plano" : "Novo Plano"}</SheetTitle>
          <SheetDescription>
            {editing
              ? "Altere os dados do plano."
              : "Preencha os dados para criar um novo plano."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 px-4">
          <FieldGroup>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Field>
              <FieldLabel htmlFor="plan-name">Nome do plano</FieldLabel>
              <Input
                id="plan-name"
                placeholder="Ex: Pro"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="plan-price">Preco (R$)</FieldLabel>
              <Input
                id="plan-price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="plan-maxlinks">Maximo de links</FieldLabel>
              <Input
                id="plan-maxlinks"
                type="number"
                min="1"
                placeholder="10"
                required
                value={form.maxLinks}
                onChange={(e) => setForm({ ...form, maxLinks: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="plan-maxclicks">
                Maximo de cliques/mes
              </FieldLabel>
              <Input
                id="plan-maxclicks"
                type="number"
                min="1"
                placeholder="1000"
                required
                value={form.maxClicks}
                onChange={(e) =>
                  setForm({ ...form, maxClicks: e.target.value })
                }
              />
            </Field>
            <Field className="mt-4">
              <Button type="submit" disabled={saving}>
                {saving
                  ? "Salvando..."
                  : editing
                    ? "Salvar alteracoes"
                    : "Criar plano"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </SheetContent>
    </Sheet>
  );
}
