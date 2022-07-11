const express = require("express");
var logger = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

const DetectFaceController = require("./controllers/detect-faces.controller");
app.post("/api/detect-faces", DetectFaceController);
app.get("/api/test", function (req, res) {
  res.send({message: "Hello world!"});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
