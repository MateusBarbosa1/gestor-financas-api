const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createUsuario(data) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const usuario = await prisma.usuarios.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salario: 0.0,
      },
    });
    return { success: true, id: usuario.id };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function getUsuarioEMAIL(email) {
  try {
    const usuario = await prisma.usuarios.findUniqueOrThrow({
      where: { email: email },
    });
    return { success: true, data: usuario };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function getUsuarioID(id) {
  try {
    const usuario = await prisma.usuarios.findUniqueOrThrow({
      where: { id: id },
    });
    return { success: true, data: usuario };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
async function updateUsuario(id, data) {
  try {
    if (!id || !data) {
      return {
        success: false,
        error: "ID e dados são obrigatórios",
      };
    }

    const usuario = await prisma.usuarios.update({
      where: { id },
      data,
    });
    return { success: true, data: usuario };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
module.exports = {
  createUsuario,
  getUsuarioEMAIL,
  getUsuarioID,
  updateUsuario,
};
