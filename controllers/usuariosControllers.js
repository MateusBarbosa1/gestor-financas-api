const usuariosModels = require("../models/usuariosModels");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports.returnInfosUsers = (app, req, res) => {
  const token = req.cookies["token"];
  if (!token) return res.status(401).json({ authenticated: false });

  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ authenticated: false });
    const id = decoded.id;

    const usuario = await usuariosModels.getUsuarioID(id);
    const data = {
      nome: usuario.data.name,
      email: usuario.data.email,
      salario: usuario.data.salario,
    };
    return res.status(200).json(data);
  });
};
module.exports.updateUsuario = (app, req, res) => {
  const token = req.cookies["token"];
  const data = req.body;

  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ authenticated: false });
    const id = decoded.id;

    const usuario = await usuariosModels.updateUsuario(id, data);
    return res.status(200).json(usuario.data.id);
  });
};
