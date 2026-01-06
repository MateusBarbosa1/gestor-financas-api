module.exports = (app) => {
  const homeControllers = require("../controllers/homeControllers");
  app.get("/home", (req, res) => {
    homeControllers.renderHomePage(app, req, res);
  });
};
