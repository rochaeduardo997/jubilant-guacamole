const chalk = require('chalk');

module.exports = {
  printLog(from, ...args){
    let allArgs = '';
    for(let arg of args){
      allArgs = allArgs + arg + ' | ';
    }

    console.debug(new Date(), '|', chalk.bold(from), '|', allArgs);
  }
}