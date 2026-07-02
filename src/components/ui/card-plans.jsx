// frontend/src/components/card-plan.jsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CardPlan({ plan }) {
  return (
    <Card key={plan.id} className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription className="text-3xl font-bold text-foreground">
          {Number(plan.price) === 0
            ? "Grátis"
            : `R$ ${Number(plan.price).toFixed(2)}/mês`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2 text-sm">
        <span>✅ Até {plan.maxLinks} links encurtados</span>
        <span>
          ✅ Até {plan.maxClicks.toLocaleString("pt-BR")} cliques por mês
        </span>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/register">Começar agora</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
