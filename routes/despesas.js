module.exports = (app) => {
  const despesasControllers = require("../controllers/despesasControllers");
  app.post("/api/despesas/create", (req, res) => {
    despesasControllers.createDespesas(app, req, res);
  });
  app.get("/api/despesas/read", (req, res) => {
    despesasControllers.readDespesas(app, req, res);
  });
  app.patch("/api/despesas/update/:id", (req, res) => {
    despesasControllers.updateDespesas(app, req, res);
  });
  app.delete("/api/despesas/delete/:id", (req, res) => {
    despesasControllers.deleteDespesas(app, req, res);
  });
};
