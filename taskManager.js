const fs = require("fs");

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
