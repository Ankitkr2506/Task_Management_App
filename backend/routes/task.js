const router = require("express").Router();
const task = require("../models/task");
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("../routes/auth"); // Import authenticateToken middleware

// Create task
router.post("/create-task", authenticateToken, async (req, res) => {
    try {
        const { title, desc } = req.body; // Destructure request body
        const {id} = req.headers;
        // Create and save the task
        const newTask = new Task({ title, desc });
        const savedTask = await newTask.save();
        const taskId = savedTask._id;
        // Update the user's tasks array
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });

        // Respond with success
        res.status(200).json({ message: "Task Created" });
    } catch (error) {
        console.error("Error creating task:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//get-all-tasks
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const userData = await User.findById(id).populate("tasks");  // Populate the tasks field
      res.status(200).json({ data: userData });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });
  

//delete tasks
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull:{tasks: id}});
        //const userData = await User.findById(userId);
        res.status(200).json({ message: "Task deleted successfully"});
    } catch (error) {
        console.error("Error fetching tasks:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//update tasks
router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params;
        const {title, desc} = req.body;
        await Task.findByIdAndUpdate(id, {title: title, desc: desc});
        res.status(200).json({ message: "Task updated successfully"});
    } catch (error) {
        console.error("Error fetching tasks:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//update-Important Task
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params;
        const TaskData = await task.findById(id);
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id, {important: !ImpTask });
        res.status(200).json({ message: "Task updated successfully"});
    } catch (error) {
        console.error("Error fetching tasks:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//Update-complete Task
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params;
        const TaskData = await task.findById(id);
        const CompleteTask = TaskData.complete;
        await Task.findByIdAndUpdate(id, {complete: !CompleteTask });
        res.status(200).json({ message: "Task updated successfully"});
    } catch (error) {
        console.error("Error fetching tasks:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//get-important tasks
router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const Data = await User.findById(id).populate({
        path: "tasks",
        match: { important: true }, // Filter tasks to only include important ones
        options:{sort: {createdAt: -1}},
      });
      const ImpTaskData=Data.tasks;
      res.status(200).json({ data: ImpTaskData });
    } catch (error) {
      console.error("Error fetching important tasks:", error); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

//get-complete Tasks
router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const Data = await User.findById(id).populate({
        path: "tasks",
        match: { complete: true }, // Filter tasks to only include important ones
        options:{sort: {createdAt: -1}},
      });
      const ImpTaskData=Data.tasks;
      res.status(200).json({ data: ImpTaskData });
    } catch (error) {
      console.error("Error fetching important tasks:", error); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

//get incomplete Tasks
router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const Data = await User.findById(id).populate({
        path: "tasks",
        match: { complete: false }, // Filter tasks to only include important ones
        options:{sort: {createdAt: -1}},
      });
      const ImpTaskData=Data.tasks;
      res.status(200).json({ data: ImpTaskData });
    } catch (error) {
      console.error("Error fetching important tasks:", error); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


module.exports = router;
