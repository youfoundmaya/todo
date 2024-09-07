const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((err) => {
    console.log(err);
  });

const listRoutes = require("./routes/listRoutes");

app.use("/todo", listRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(6969, () => {
  console.log("server running");
});
