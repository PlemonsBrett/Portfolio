module.exports.taskManager = (request, response) =>
  response.render("task-manager", {
    title: "Task Manager",
    name: "Brett Plemons",
  });
