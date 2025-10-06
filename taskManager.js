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
          id: 1,
          title: title,
          status: "pending",
        },
      ];
      task = JSON.stringify(task, null, 2);
      fs.writeFileSync(filePath, task);

      // If tasks.json already existed and app isn't running for the first time
    } else {
      let tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      taskID = getMaxID(tasks) + 1;
      const task = {
        id: taskID,
        title: title,
        status: "pending",
      };
      tasks.push(task);
      tasks = JSON.stringify(tasks, null, 2);
      fs.writeFileSync(filePath, tasks);
    }

    console.log(`Task: ${title}`);
    console.log("Task added successfully!");
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

exports.markTask = (filePath, taskID) => {
  try {
    tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let taskFound = false;

    for (const task of tasks) {
      if (task.id === taskID) {
        taskFound = true;
        task.status = "done";
        console.log(`Task: ${task.title}`);
        console.log(`Task with ID ${taskID} marked as completed`);

        break;
      }
    }

    if (taskFound) {
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    } else {
      console.log(`Task with ID ${taskID} not found`);
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

exports.deleteTask = (filePath, taskID) => {
  try {
    const tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let taskFound = false;

    let currentTasks = tasks.filter((task) => Number(task.id !== taskID));

    if (currentTasks.length < tasks.length) {
      taskFound = true;
    }

    if (taskFound) {
      fs.writeFileSync(filePath, JSON.stringify(currentTasks, null, 2));
    } else {
      console.log(`Task with ID ${taskID} not found`);
    }
  } catch (err) {
    console.log(`Error: ` + err.message);
  }
};
