const despesasModel = require("../models/despesasModel.js");

module.exports.createDespesas = async (app, req, res) => {
  const data = req.body;
  const despesa = await despesasModel.createDespesas(data);

  if (despesa.sucess) {
    res.status(201).json(despesa.id);
  } else {
    res.status(500).json(despesa.error);
  }
};
module.exports.readDespesas = async (app, req, res) => {
  const despesas = await despesasModel.readDespesas();

  if (despesas.sucess) {
    res.status(200).json(despesas.data);
  } else {
    res.status(500).json(despesas.error);
  }
};
