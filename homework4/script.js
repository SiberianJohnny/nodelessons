const fs = require("fs");
const path = require('path');
const inquirer = require('inquirer');

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
}

let currDir = (__dirname);

let list = fs.readdirSync(currDir);

const inq = () => {
  inquirer
    .prompt([{
      name: 'fileName',
      type: 'list',
      message: 'Choose file:',
      choices: list,
    }])
    .then((answer) => {
      currDir = path.join(currDir, answer.fileName);

      if (isFile(currDir)) {
        fs.readFile(currDir, 'utf8', (err, data) => {
          console.log(data);
          inquirer
            .prompt([{
              name: 'value',
              type: 'input',
              message: 'Enter searching value:',
            }])
            .then((answer) => {
              if (data.includes(answer.value)) {
                console.log('This is your file')
              } else {
                console.log('No ' + answer.value + ' in this file')
              }
            });
        });
      } else {
        list = fs.readdirSync(currDir)
        inq();
      }
    });
}

inq();