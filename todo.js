const { fileURLToPath } = require("url");
const taskManager = require("./taskManager");
const fs = require("fs");

filePath = "./tasks.json";
let command = process.argv[2];

if (command === "add") {
  taskManager.addTask(filePath, process.argv[3]);
}

if (command === "list") {
  taskManager.listTask(filePath);
}

if (command === "mark") {
  taskManager.markTask(filePath, parseInt(process.argv[3]));
}

if (command === 'delete') {
  taskManager.deleteTask(filePath, parseInt(process.argv[3]) )
}
