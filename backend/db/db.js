const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.DB);
  console.log("Connected to database");
} catch {
  console.log("Error connecting to database");
}
