module.exports = (app) => {
  const despesasControllers = require("../controllers/despesasControllers");
  app.get("/despesas/create", (req, res) => {
    despesasControllers.createDespesas(app, req, res);
  });
};
