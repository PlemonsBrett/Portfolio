const chalk = require("chalk");

const successMsg = chalk.bold.green.inverse("Success!");
const errorMsg = chalk.bold.red.inverse("Error!");
const warningMsg = chalk.bold.keyword("orange").inverse("Warning!");
const interest = chalk.bold.blue;

module.exports = {
  successMsg: successMsg,
  errorMsg: errorMsg,
  warningMsg: warningMsg,
  interest: interest,
};
