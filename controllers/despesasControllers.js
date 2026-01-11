const despesasModel = require("../models/despesasModel.js");

module.exports.createDespesas = async (app, req, res) => {
  const data = req.body;
  const despesa = await despesasModel.createDespesas(data);

  if (despesa.success) {
    console.log("S: " + despesa);
    res.status(201).json(despesa.id);
  } else {
    console.log("E: " + despesa);
    res.status(500).json(despesa.error);
  }
};
module.exports.readDespesas = async (app, req, res) => {
  const despesas = await despesasModel.readDespesas();

  if (despesas.success) {
    res.status(200).json(despesas.data);
  } else {
    res.status(500).json(despesas.error);
  }
};
module.exports.updateDespesas = async (app, req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (data.state) {
    // PAGAR DESPESA

    const agoraBrasil = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo",
      })
    );
    data.maturity = agoraBrasil;
  }

  const despesa = await despesasModel.updateDespesa(id, data);

  if (despesa.success) {
    res.status(200).json(despesa.data.id);
  } else {
    res.status(500).json(despesa.error);
  }
};
