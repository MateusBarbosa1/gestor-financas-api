module.exports = (app) => {
  app.get("/", (req, res) => {
    const token = req.cookies["token"];
    if (token === undefined) {
      res.redirect("/login");
    } else {
      res.render("home");
    }
  });
};
