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
module.exports.updateDespesas = async (app, req, res) => {
  const { id } = req.params;
  const data = req.body;

  const despesa = await despesasModel.updateDespesa(id, data);

  if (despesa.sucess) {
    res.status(200).json(despesa.data.id);
  } else {
    res.status(500).json(despesa.error);
  }
};
