const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const uploadFileRouter = require("./Router/uploadFileRouter");
const getListsRouter = require("./Router/getListsRouter");
require("dotenv").config();
const PORT2 = 5000;
const URI1 = 'mongodb://alexsuf:Ab27021986@127.0.0.1:27017'

const URI="mongodb://127.0.0.1/amberdent";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));
app.use(uploadFileRouter);
app.use(getListsRouter);
app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

mongoose
  .connect(URI)
  .then(() =>
    app.listen(PORT2, () =>
      console.log(`Server and mongoDB started on port: ${PORT2}`),
    ),
  )
  .catch((e) => console.log("Ошибка подключения к базе MONGO DB:", e));
