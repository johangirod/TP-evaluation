// ✅ Fichier à modifier pour l'évaluation

import express from "express";
import { engine } from "express-handlebars";
import path from "path";

/**  ❌ Ne pas modifier ce block */

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.engine("handlebars", engine());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

/** ✅ Vous pouvez ajouter vos modifications en dessous : */

app.use("/img", express.static(path.join(__dirname, "./img")));


app.listen(3000, () => console.log("Server started on http://localhost:3000"));
