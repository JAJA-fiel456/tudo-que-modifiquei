import "dotenv/config";

export const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
export const authSecret =
  process.env.BETTER_AUTH_SECRET || "dev-secret-change-me-at-least-32-characters";

if (!process.env.BETTER_AUTH_SECRET) {
  console.warn(
    "BETTER_AUTH_SECRET nao definido. Usando segredo temporario apenas para desenvolvimento."
  );
}

if (!hasDatabaseUrl) {
  console.warn(
    "DATABASE_URL nao definido. O servidor vai usar dados temporarios em memoria durante o desenvolvimento."
  );
}
