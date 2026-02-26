module.exports = (app) => {
  const transacoesControllers = require("../controllers/transacoesControllers.js");
  app.get("/transacoes", (req, res) => {
    transacoesControllers.renderPage(app, req, res);
  });
};
