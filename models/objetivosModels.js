const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createObjetivos(data) {
  try {
    const objetivo = await prisma.objetivos.create({
      data: {
        name: data.name,
        value: 0.0,
        valueObjective: Number(data.valueObjective),
      },
    });
    return { success: true, id: objetivo.id };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function readObjetivos() {
  try {
    const objetivos = await prisma.objetivos.findMany();
    return { success: true, objetivos: objetivos };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createObjetivos,
  readObjetivos,
};
