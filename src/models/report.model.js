import prisma from "../lib/prisma.js";
export function create(data) {
  return prisma.report.create({
    data,
  });
}

export function getAll() {
  return prisma.report.findMany({
    include: {
      user: true,
    },
  });
}

export function getById(id) {
  return prisma.report.findUnique({
    where: {
      id: BigInt(id),
    },
  });
}

export function remove(id) {
  return prisma.report.delete({
    where: {
      id: BigInt(id),
    },
  });
}