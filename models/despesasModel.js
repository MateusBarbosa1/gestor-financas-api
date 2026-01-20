const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function dateInputToBrazilDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

async function createDespesas(data) {
  try {
    if (!data || !data.maturity) {
      return {
        success: false,
        error: "Dados inválidos: maturity é obrigatório",
      };
    }

    const dataBrasil = dateInputToBrazilDate(data.maturity);

    const despesa = await prisma.despesas.create({
      data: {
        name: data.name,
        value: Number(data.value),
        state: data.state || "pendente",
        categoria: data.categoria,
        maturity: dataBrasil,
      },
    });

    return { success: true, id: despesa.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function readDespesas() {
  try {
    const despesas = await prisma.despesas.findMany({
      orderBy: {
        maturity: "asc",
      },
    });

    return { success: true, data: despesas };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function updateDespesa(id, data) {
  try {
    if (!id || !data) {
      return {
        success: false,
        error: "ID e dados são obrigatórios",
      };
    }

    const despesa = await prisma.despesas.update({
      where: { id },
      data,
    });
    return { success: true, data: despesa };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  createDespesas,
  readDespesas,
  updateDespesa,
};
