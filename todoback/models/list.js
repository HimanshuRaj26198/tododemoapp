const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

const listSchema = new Schema({
  title: String,
  date: String,
  time: String,
  task: String,
  completed: Boolean,
});

module.exports = mongoose.model("List", listSchema);
