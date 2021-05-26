const express = require("express");
const listCtrl = require("../controllers/lists.controller");
const list = require("../models/list");
const router = express.Router();

router.get("/", listCtrl.getTasks);
router.post("/add", listCtrl.addTask);
router.post("/delete", listCtrl.deleteTask);
router.post("/completeit", listCtrl.completeIt);
router.get("/pending", listCtrl.getPending);
router.get("/completed", listCtrl.getCompleted);
router.put("/update/:id", listCtrl.editTask);
router.get("/single/:id", listCtrl.singleTask);

module.exports = { taskRoutes: router };
