const express=require("express");
// const userRouter=require("")
var authRouter = require("../routes/api/auth");
var taskRouter = require("../routes/api/task");


module.exports = function(app){

app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/task",taskRouter);

};