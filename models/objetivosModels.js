const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createObjetivos(data, id_user) {
  try {
    const objetivo = await prisma.objetivos.create({
      data: {
        name: data.name,
        id_user: id_user,
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
async function readObjetivosUserID(id_user) {
  try {
    const objetivos = await prisma.objetivos.findMany({
      where: {
        id_user: id_user,
      },
    });
    return { success: true, objetivos: objetivos };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function addValueObjetivo(id, value) {
  try {
    const objetivoV1 = await prisma.objetivos.findUnique({
      where: {
        id: id,
      },
    });
    const newValue = Number(objetivoV1.value) + Number(value);
    const objetivo = await prisma.objetivos.update({
      where: {
        id: id,
      },
      data: {
        value: Number(newValue),
      },
    });
    return { success: true, objetivo: objetivo };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function rmValueObjetivo(id, value) {
  try {
    const objetivoV1 = await prisma.objetivos.findUnique({
      where: {
        id: id,
      },
    });
    const newValue = Number(objetivoV1.value) - Number(value);
    const objetivo = await prisma.objetivos.update({
      where: {
        id: id,
      },
      data: {
        value: Number(newValue),
      },
    });
    return { success: true, objetivo: objetivo };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function deleteObjetivo(id_objetivo) {
  try {
    await prisma.objetivos.delete({
      where: {
        id: id_objetivo,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function updateObjetivo(id_objetivo, data) {
  try {
    await prisma.objetivos.update({
      where: {
        id: id_objetivo,
      },
      data: data,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
module.exports = {
  createObjetivos,
  readObjetivos,
  addValueObjetivo,
  readObjetivosUserID,
  rmValueObjetivo,
  deleteObjetivo,
  updateObjetivo,
};
