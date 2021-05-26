const express = require("express");
const cors = require("cors");
const Tasks = require("./routes/lists.routes");
require("dotenv").config();
PORT = process.env.PORT;
require("./db/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("dev"));

app.use("/tasks", Tasks.taskRoutes);

try {
  app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
} catch {
  console.log("Error listeing the app");
}
