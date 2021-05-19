const express = require("express");
let router = express.Router();
const { Task } = require("../../models/task");
const checkLogin = require("../../middleware/checkLogin");
const { EROFS } = require("node:constants");

//get user
router.get("/:id", async (req, res) => {
  let task = Task.find({ userId: req.params.id });
  if (!task) res.send("task not found");
  return res.send(task);
});
//get task where user is added as contributor
router.get("/byContributors/id", async (erq, res) => {
  let task = Task.find({ contributors: req.params.id });
  if (!task) res.send("task not found");
  return res.send(task);
});

//put
router.put("/", checkLogin, async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) return res.status(400).send("task not found.");
  task.taskName = req.body.taskName;
  task.description = req.body.description;
  task.collaborators = req.body.collaborators;
  task.team = req.body.team;

  task.save();
  res.send("task updated");
});

//post
router.post("/", checkLogin, async (req, res) => {
  console.log("called task creation");
  const { userId, createdby, taskName, description, collaborators, team } =
    req.body;

  let task = new Task({
    userId,
    createdby,
    taskName,
    description,
    collaborators,
    team,
  });

  task.save();
  res.send("task created");
});

module.exports = router;
