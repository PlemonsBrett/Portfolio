const noteApp = (request, response) =>
  response.render("notes", { title: "Notes", name: "Brett Plemons" });

module.exports = {
  noteApp: noteApp,
};
