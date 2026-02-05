const usuariosModel = require("../models/usuariosModels.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = process.env.SECRET;

module.exports.createUsuarios = async (app, req, res) => {
  const data = req.body;
  const usuario = await usuariosModel.createUsuario(data);

  if (usuario.success) {
    const token = jwt.sign({ id: usuario.id }, SECRET);
    if (process.env.NODE_ENV == "development") {
      return res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: false, // prod = true
          sameSite: "Lax", // prod = None
          path: "/",
        })
        .json({
          nome: usuario.nome,
        });
    } else {
      return res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: true, // prod = true
          sameSite: "Lax", // prod = None
          path: "/",
        })
        .json({
          nome: usuario.nome,
        });
    }
  } else {
    res.status(500).json(usuario.error);
  }
};
module.exports.loginUser = async (app, req, res) => {
  const data = req.body;
  const usuario = await usuariosModel.getUsuarioEMAIL(data.email);

  if (usuario.success) {
    const validationPassword = bcrypt.compareSync(
      data.password,
      usuario.data.password,
    ); // validar senha
    if (validationPassword) {
      console.log("OK");
      // senha validada
      const token = jwt.sign({ id: usuario.data.id }, SECRET);
      if (process.env.NODE_ENV == "development") {
        return res
          .status(201)
          .cookie("token", token, {
            httpOnly: true,
            secure: false, // prod = true
            sameSite: "Lax", // prod = None
            path: "/",
          })
          .json({
            nome: usuario.nome,
          });
      } else {
        return res
          .status(201)
          .cookie("token", token, {
            httpOnly: true,
            secure: true, // prod = true
            sameSite: "Lax", // prod = None
            path: "/",
          })
          .json({
            nome: usuario.nome,
          });
      }
    } else {
      // senha incorreta
      res.status(401).json({ error: "credenciais invalidas!" });
    }
  } else {
    res.status(401).json(usuario.error); // não encontrou
  }
};
module.exports.authMiddleware = function (req, res, next) {
  const token = req.cookies["token"];
  if (!token) return res.status(401).json({ authenticated: false });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ authenticated: false });
    req.user = decoded;
    next();
  });
};
