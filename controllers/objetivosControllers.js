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

module.exports.deleteObjetivos = async (app, req, res) => {
  const token = req.cookies["token"];
  const { id } = req.params;

  jwt.verify(token, SECRET, async (err, decoded) => {
    const id_user = decoded.id;

    const objetivosUsuario = await objetivosModels.readObjetivosUserID(id_user);
    objetivosUsuario.objetivos.forEach(async (element) => {
      if (element.id == id) {
        // o objetivo é realmente do usuario
        const objetivoDeleted = await objetivosModels.deleteObjetivo(id);
        if (objetivoDeleted.success) {
          res.status(200).json(objetivoDeleted);
        } else {
          res.status(500).json(objetivoDeleted.error);
        }
      }
    });
  });
};
module.exports.updateObjetivos = async (app, req, res) => {
  const token = req.cookies["token"];
  const { id } = req.params;
  const data = req.body;

  jwt.verify(token, SECRET, async (err, decoded) => {
    const id_user = decoded.id;

    const objetivosUsuario = await objetivosModels.readObjetivosUserID(id_user);
    objetivosUsuario.objetivos.forEach(async (element) => {
      if (element.id == id) {
        // o objetivo é realmente do usuario
        const objetivoUpdated = await objetivosModels.updateObjetivo(id, data);
        if (objetivoUpdated.success) {
          res.status(200).json(objetivoUpdated);
        } else {
          res.status(500).json(objetivoUpdated.error);
        }
      }
    });
  });
};
