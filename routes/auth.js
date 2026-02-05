module.exports = (app) => {
  const authControllers = require("../controllers/authControllers.js");
  app.get("/cadastro", (req, res) => {
    const token = req.cookies["token"];
    if (token === undefined) {
      res.render("cadastro");
    } else {
      res.redirect("/");
    }
  });
  app.get("/login", (req, res) => {
    const token = req.cookies["token"];
    if (token === undefined) {
      res.render("login");
    } else {
      res.redirect("/");
    }
  });

  app.post("/api/auth/cadastro", (req, res) => {
    authControllers.createUsuarios(app, req, res);
  });
  app.post("/api/auth/login", (req, res) => {
    authControllers.loginUser(app, req, res);
  });
  app.get("/api/auth/me", authControllers.authMiddleware, (req, res) => {
    res.json({ authenticated: true, user: req.user });
  });
};
