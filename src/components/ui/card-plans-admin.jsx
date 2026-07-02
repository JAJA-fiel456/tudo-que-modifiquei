import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

export default function CardPlanAdmin({
  plan,
  confirmDelete,
  onEdit,
  onDelete,
  onRequestDelete,
  onCancelDelete,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>
          {Number(plan.price) === 0
            ? "Gratis"
            : `R$ ${Number(plan.price).toFixed(2)}/mes`}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground flex flex-col gap-1">
        <span>Ate {plan.maxLinks} links</span>
        <span>
          Ate {plan.maxClicks.toLocaleString("pt-BR")} cliques/mes
        </span>
      </CardContent>
      <CardFooter className="flex gap-2">
        {confirmDelete === plan.id ? (
          <>
            <span className="text-sm text-destructive flex-1">
              Confirmar exclusao?
            </span>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(plan.id)}
            >
              Sim
            </Button>
            <Button size="sm" variant="outline" onClick={onCancelDelete}>
              Nao
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={() => onEdit(plan)}>
              <Pencil className="size-3.5 mr-1" /> Editar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onRequestDelete(plan.id)}
            >
              <Trash2 className="size-3.5 mr-1" /> Excluir
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
