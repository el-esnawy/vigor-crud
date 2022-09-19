const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const apiPort = 8080;

mongoose
  .connect("mongodb://mongo:27017/notes", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => console.log(err));

const noteRouter = require("./routes/noteRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", noteRouter);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
