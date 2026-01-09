const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createDespesas(data) {
  try {
    const despesa = await prisma.despesas.create({
      data: {
        name: data.name,
        value: Number(data.value),
        state: "pendente",
      },
    });

    return { sucess: true, id: despesa.id };
  } catch (error) {
    return { sucess: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function readDespesas() {
  try {
    const despesas = await prisma.despesas.findMany();

    return { sucess: true, data: despesas };
  } catch (error) {
    return { sucess: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createDespesas,
  readDespesas,
};
