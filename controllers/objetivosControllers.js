const objetivosModels = require("../models/objetivosModels.js");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

module.exports.createObjetivos = async (app, req, res) => {
  const data = req.body;
  const token = req.cookies["token"];

  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ authenticated: false });

    const id_user = decoded.id;
    const objetivo = await objetivosModels.createObjetivos(data, id_user);

    if (objetivo.success) {
      res.status(201).json(objetivo.id);
    } else {
      res.status(500).json(objetivo.error);
    }
  });
};

module.exports.readObjetivos = async (app, req, res) => {
  const token = req.cookies["token"];

  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ authenticated: false });

    const id_user = decoded.id;
    const objetivos = await objetivosModels.readObjetivosUserID(id_user);

    if (objetivos.success) {
      res.status(200).json(objetivos.objetivos);
    } else {
      res.status(500).json(objetivos.error);
    }
  });
};
