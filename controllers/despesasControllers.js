module.exports.createDespesas = async (app, req, res) => {
  const data = req.body;

  const despesasModel = require("../models/despesasModel.js");

  const despesas = await despesasModel.createDespesas(data);

  if (despesas.sucess) {
    res.status(201).json(despesas.data);
  } else {
    res.status(500).json(despesas.error);
  }
};
