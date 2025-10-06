const taskManager = require("./taskManager");
const fs = require("fs");

filePath = "./tasks.json";
let command = process.argv[2];
let title = process.argv[3];


if (command === "add") {
  taskManager.addTask(filePath, title);
}
