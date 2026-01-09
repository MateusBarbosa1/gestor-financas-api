module.exports = (app) => {
  const despesasControllers = require("../controllers/despesasControllers");
  app.post("/despesas/create", (req, res) => {
    despesasControllers.createDespesas(app, req, res);
  });
  app.get("/despesas/read", (req, res) => {
    despesasControllers.readDespesas(app, req, res);
  });
};
