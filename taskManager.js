const fs = require("fs");

const getMaxID = (tasksObj) => {
  let maxID = 0;

  for (const taskObj of tasksObj) {
    if (taskObj.id > maxID) {
      maxID = taskObj.id;
    }
  }

  return maxID;
};

exports.addTask = (filePath, title) => {
  // If tasks.json file doesn't exist and app is running for the first time
  try {
    if (!fs.existsSync(filePath)) {
      let task = [
        {
          title: title,
          status: "pending",
        },
      ];
      task = JSON.stringify(task, null, 2);
      fs.writeFileSync(filePath, task);

      // If tasks.json already existed and app isn't running for the first time
    } else {
      let tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const task = {
        title: title,
        status: "pending",
      };
      tasks.push(task);
      tasks = JSON.stringify(tasks, null, 2);
      fs.writeFileSync(filePath, tasks);
    }

    console.log(`Task: ${title}`);
    console.log("Task added successfully");
  } catch (err) {
    console.log("Can not add file: " + err.msg);
  }
};

exports.listTask = (filePath) => {
  tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const task of tasks) {
    console.log(
      `${task.id}. ${task.status === "pending" ? "[]" : "[x]"} ${task.title}`
    );
  }
};
