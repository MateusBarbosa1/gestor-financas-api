const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function dateInputToBrazilDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day, 12, 0, 0);
}

async function createDespesas(data) {
  try {
    let dataBrasil = dateInputToBrazilDate(data.maturity);
    const despesa = await prisma.despesas.create({
      data: {
        name: data.name,
        value: Number(data.value),
        state: "pendente",
        maturity: dataBrasil,
      },
    });
    return { success: true, id: despesa.id };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function readDespesas() {
  try {
    const despesas = await prisma.despesas.findMany();

    return { success: true, data: despesas };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function updateDespesa(id, data) {
  try {
    const despesa = await prisma.despesas.update({
      where: { id: id },
      data: data,
    });

    return { success: true, data: despesa };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createDespesas,
  readDespesas,
  updateDespesa,
};
