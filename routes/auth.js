module.exports = (app) => {
  const authControllers = require("../controllers/authControllers.js");
  app.post("/usuarios/create", (req, res) => {
    authControllers.createUsuarios(app, req, res);
  });
  app.post("/auth/login", (req, res) => {
    authControllers.loginUser(app, req, res);
  });
  app.get("/auth/me", authControllers.authMiddleware, (req, res) => {
    res.json({ authenticated: true, user: req.user });
  });
};
