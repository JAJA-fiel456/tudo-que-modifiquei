import "./env.js";
import { createRequire } from "node:module";
import pg from "pg";

import { PrismaPg } from "@prisma/adapter-pg";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("../generated/prisma/index.js");

function createMissingDatabaseProxy() {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(
          "DATABASE_URL nao esta definido. Crie backend2/.env usando backend2/.env.example e reinicie o backend."
        );
      },
    }
  );
}

let prismaClient;

if (process.env.DATABASE_URL) {
  const adapter = new PrismaPg(
    new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    })
  );

  prismaClient = new PrismaClient({ adapter });
} else {
  prismaClient = createMissingDatabaseProxy();
}

export const prisma = prismaClient;

export default prismaClient;
