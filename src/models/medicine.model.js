import { hasDatabaseUrl } from "../lib/env.js";
import prisma from "../lib/prisma.js";

let nextMemoryId = 1n;
const memoryMedicines = [];

function normalizeMedicine(data, id = nextMemoryId++) {
  return {
    id,
    name: data.name,
    price: Number(data.price),
    code: data.code,
    ondeTem: data.ondeTem || null,
    riskLevel: Number(data.riskLevel),
  };
}

export function getAll() {
  if (!hasDatabaseUrl) {
    return memoryMedicines;
  }

  return prisma.medicine.findMany();
}

export function getById(id) {
  if (!hasDatabaseUrl) {
    return memoryMedicines.find((medicine) => medicine.id === id) || null;
  }

  return prisma.medicine.findUnique({
    where: { id },
  });
}

export function getByCode(code) {
  if (!hasDatabaseUrl) {
    return memoryMedicines.find((medicine) => medicine.code === code) || null;
  }

  return prisma.medicine.findUnique({
    where: { code },
  });
}

export function search(termo) {
  if (!hasDatabaseUrl) {
    const normalizedTerm = termo.toLowerCase();

    return memoryMedicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(normalizedTerm)
    );
  }

  return prisma.medicine.findMany({
    where: {
      name: {
        contains: termo,
        mode: "insensitive",
      },
    },
  });
}

export function mostSearched() {
  if (!hasDatabaseUrl) {
    return memoryMedicines.slice(0, 10);
  }

  return prisma.medicine.findMany({
    include: {
      _count: {
        select: {
          searchTracks: true,
        },
      },
    },
    orderBy: {
      searchTracks: {
        _count: "desc",
      },
    },
    take: 10,
  });
}

export function create(data) {
  if (!hasDatabaseUrl) {
    const existingMedicine = memoryMedicines.find(
      (medicine) => medicine.code === data.code
    );

    if (existingMedicine) {
      throw new Error("Ja existe um medicamento com este codigo.");
    }

    const medicine = normalizeMedicine(data);
    memoryMedicines.push(medicine);

    return medicine;
  }

  return prisma.medicine.create({
    data: {
      name: data.name,
      price: Number(data.price),
      code: data.code,
      ondeTem: data.ondeTem || null,
      riskLevel: Number(data.riskLevel),
    },
  });
}

export function update(id, data) {
  if (!hasDatabaseUrl) {
    const medicineIndex = memoryMedicines.findIndex(
      (medicine) => medicine.id === id
    );

    if (medicineIndex === -1) {
      return null;
    }

    memoryMedicines[medicineIndex] = {
      ...memoryMedicines[medicineIndex],
      ...data,
      id,
      price:
        data.price === undefined
          ? memoryMedicines[medicineIndex].price
          : Number(data.price),
      riskLevel:
        data.riskLevel === undefined
          ? memoryMedicines[medicineIndex].riskLevel
          : Number(data.riskLevel),
    };

    return memoryMedicines[medicineIndex];
  }

  return prisma.medicine.update({
    where: { id },
    data,
  });
}

export function remove(id) {
  if (!hasDatabaseUrl) {
    const medicineIndex = memoryMedicines.findIndex(
      (medicine) => medicine.id === id
    );

    if (medicineIndex !== -1) {
      memoryMedicines.splice(medicineIndex, 1);
    }

    return null;
  }

  return prisma.medicine.delete({
    where: { id },
  });
}
