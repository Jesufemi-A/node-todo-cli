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
      task = JSON.stringify(task);
      fs.writeFileSync("./tasks.json", task);

      // If tasks.json already existed and app isn't running for the first time
    } else {
      let tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const task = JSON.stringify({
        title: title,
        status: "pending",
      });
      tasks.push(task);
      fs.writeFileSync(filePath, tasks);
    }
    console.log("Task added successfully");
  } catch (err) {
    console.log("Can not add file");
  }
};
