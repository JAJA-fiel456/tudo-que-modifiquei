import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config'
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não está definida no arquivo .env');
}

const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }   // necessário para Supabase
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const operations = {

  async criarRemedio(data) {
    return prisma.medicine.create({ data });
  },

  async listarRemedios() {
    return prisma.medicine.findMany({ orderBy: { name: 'asc' } });
  },

  async buscarRemedioPorCodigo(codigo) {
    return prisma.medicine.findUnique({ where: { codigo } });
  },

  async procurarRemedios(termo) {
    return prisma.medicine.findMany({
      where: {
        OR: [
          { name: { contains: termo, mode: 'insensitive' } },
          { codigo: { contains: termo, mode: 'insensitive' } }
        ]
      }
    });
  },

  async registrarBusca(medicineId) {
    return prisma.medicineSearch.create({ data: { medicineId } });
  },

  async maisProcurados(quantidade = 10) {
    const buscas = await prisma.medicineSearch.groupBy({
      by: ['medicineId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: quantidade
    });

    if (buscas.length === 0) return [];

    const ids = buscas.map(b => b.medicineId);
    const remedios = await prisma.medicine.findMany({ where: { id: { in: ids } } });

    return remedios.map(remedio => {
      const busca = buscas.find(b => b.medicineId === remedio.id);
      return { ...remedio, vezesBuscado: busca._count.id };
    });
  },

  async criarRelatorio(userId, reportType, data = null) {
    return prisma.report.create({
      data: { userId, reportType, data }
    });
  }
};

export default operations;