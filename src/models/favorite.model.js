import prisma from "../lib/prisma.js";
export function create(data) {
  return prisma.favorite.create({
    data,
  });
}

export function getAll() {
  return prisma.favorite.findMany({
    include: {
      medicine: true,
      user: true,
    },
  });
}

export function remove(id) {
  return prisma.favorite.delete({
    where: {
      id: BigInt(id),
    },
  });
}