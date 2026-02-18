const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function dateInputToBrazilDate(dateString) {
  if (dateString instanceof Date) return dateString;

  if (dateString.includes("T")) return new Date(dateString);

  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

async function createDespesas(data, id_user) {
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
        id_user: id_user,
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
async function readDespesasUserID(id_user) {
  try {
    const despesas = await prisma.despesas.findMany({
      where: {
        id_user: id_user,
      },
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
      return { success: false, error: "ID e dados são obrigatórios" };
    }

    // Se a data de vencimento estiver presente nos dados, converte para objeto Date
    if (data.maturity) {
      data.maturity = dateInputToBrazilDate(data.maturity);
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
async function deleteDespesa(id_despesa) {
  try {
    await prisma.despesas.delete({ where: { id: id_despesa } });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  createDespesas,
  readDespesas,
  readDespesasUserID,
  updateDespesa,
  deleteDespesa,
};
