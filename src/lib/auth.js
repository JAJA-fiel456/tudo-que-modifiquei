// src/lib/auth.js
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { memoryAdapter } from "@better-auth/memory-adapter";
import { authSecret, hasDatabaseUrl } from "./env.js";
import { prisma } from "./prisma.js";

const memoryDb = {
  user: [],
  session: [],
  account: [],
  verification: [],
};

const authConfig = {
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5500",
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  secret: authSecret,

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  socialProviders: {},
};

if (hasDatabaseUrl) {
  authConfig.database = prismaAdapter(prisma, {
    provider: "postgresql",
  });
} else {
  authConfig.database = memoryAdapter(memoryDb);
}

export const auth = betterAuth(authConfig);
