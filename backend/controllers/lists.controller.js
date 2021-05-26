const Task = require("../models/list");

// ADding task

const addTask = async (req, res) => {
  let completed = false;
  let newTask = new Task({
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    task: req.body.task,
    completed: completed,
  });

  try {
    await newTask.save();
    res.status(200).json({
      message: "Added Successfully",
    });
  } catch {
    res.status(404).json({
      message: "Something went wrong",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const result = await Task.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.status(200).json({
      message: "Fetched Successfully",
      task: result,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Something Went wrong can't load data",
    });
  }
};

const deleteTask = async (req, res) => {
  id = req.body.id;
  console.log(id);

  await Task.findOneAndDelete({ _id: id })
    .then(
      res.status(200).json({
        message: "Deleted Successfully",
      })
    )
    .catch(
      res.status(404).json({
        message: "Error Deleting the task",
      })
    );
};

const completeIt = async (req, res) => {
  let id = req.body.id;
  console.log(id);
  Task.findOne({ _id: id }, (err, task) => {
    if (!err) {
      task.completed = true;
      task.save((err) => {
        if (!err) {
          res.status(200).json({
            message: "Marked as completed successfully",
          });
          console.log("Saved successfully as completed");
        } else {
          console.log("Error cant save as completed", err);
        }
      });
    } else {
      console.log("Something went wrong");
    }
  });
};

const getPending = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const result = await Task.find({ completed: false })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    console.log(result);
    res.status(200).json({
      message: "Fetched Successfully",
      task: result,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Error Fetching the data",
    });
  }
};

const getCompleted = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;

    const result = await Task.find({ completed: true })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.status(200).json({
      message: "Successfully fetched the data",
      task: result,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Error fetching the data",
    });
  }
};

const singleTask = async (req, res) => {
  id = JSON.stringify(req.params.id);
  Task.findById(req.params.id, (err, task) => {
    if (!err) {
      res.status(200).json({
        message: "Fetched Successfully",
        task: task,
      });
    } else {
      res.status(404).json({
        message: "Error Fetching",
      });
    }
  });
};

const editTask = async (req, res) => {
  let completed = false;
  let updatedTask = {
    title: req.body.title,
    date: req.body.title,
    time: req.body.time,
    completed: completed,
  };

  Task.findByIdAndUpdate(req.params.id, updatedTask, (err) => {
    if (!err) {
      res.status(200).json({
        message: "Updated Successfully",
      });
    } else {
      res.status(404).json({
        message: "Error Updateing",
      });
    }
  });
};

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  completeIt,
  getPending,
  getCompleted,
  editTask,
  singleTask,
};
