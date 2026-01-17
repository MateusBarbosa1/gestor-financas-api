const objetivosModels = require("../models/objetivosModels.js");

module.exports.createObjetivos = async (app, req, res) => {
  const data = req.body;
  const objetivo = await objetivosModels.createObjetivos(data);

  if (objetivo.success) {
    res.status(201).json(objetivo.id);
  } else {
    res.status(500).json(objetivo.error);
  }
};

module.exports.readObjetivos = async (app, req, res) => {
  const objetivos = await objetivosModels.readObjetivos();
  if (objetivos.success) {
    res.status(200).json(objetivos.objetivos);
  } else {
    res.status(500).json(objetivos.error);
  }
};
