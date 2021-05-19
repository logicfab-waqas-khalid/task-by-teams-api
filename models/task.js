const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    createdby: String,
    taskName: String,
    description: String,
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    team: String,
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);

exports.Task = Task;
