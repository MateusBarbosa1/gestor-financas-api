const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");

const app = express();
const path = require("path");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routesPath = path.join(__dirname, "routes");

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".js")) {
    try {
      require(path.join(routesPath, file))(app);
      console.log("Loaded route:", file);
    } catch (err) {
      console.error("Erro ao carregar rota:", file);
      console.error(err);
    }
  }
});

app.listen(3000, () => console.log("server running on port 3000!"));
