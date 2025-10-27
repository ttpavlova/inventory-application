require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const indexRouter = require("./routes/indexRouter");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Inventory app is listening on port ${port}`);
});
