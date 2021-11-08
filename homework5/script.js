const http = require('http');
const path = require('path');
const fs = require("fs");
// const inquirer = require('inquirer');

// const filePath = path.join(__dirname, 'index.html');
// const readStream = fs.createReadStream(filePath);

// const isFile = fileName => {
//   return fs.lstatSync(fileName).isFile();
// }

// let currDir = (__dirname);

// let list = fs.readdirSync(currDir);

(async () => {
  const isFile = (filePath) => fs.lstatSync(filePath).isFile();

  http.createServer((req, res) => {
    const fullPath = path.join(process.cwd(), req.url);

    if (!fs.existsSync(fullPath)) return res.end('File or directory not found');

    if (isFile(fullPath)) return fs.createReadStream(fullPath).pipe(res);

    let linksList = '';

    const urlParams = req.url.match(/[\d\w\.]+/gi);

    if (urlParams) {
      urlParams.pop();
      const prevUrl = urlParams.join('/');

      linksList = urlParams.length ? `<li><a href="/${prevUrl}">...</a></li>` : `<li><a href="/">...</a></li>`;
    }

    fs.readdirSync(fullPath)
      .forEach(fileName => {
        const filePath = path.join(req.url, fileName);
        linksList += `<li><a href="${filePath}">${fileName}</a></li>`;
      });

    const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
      .replace('##links', linksList);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    return res.end(HTML)
  }).listen(3000);
})();

// const inq = () => {
//   inquirer
//     .prompt([{
//       name: 'fileName',
//       type: 'list',
//       message: 'Choose file:',
//       choices: list,
//     }])
//     .then((answer) => {
//       currDir = path.join(currDir, answer.fileName);

//       if (isFile(currDir)) {
//         fs.readFile(currDir, 'utf8', (err, data) => {
//           console.log(data);
//           inquirer
//             .prompt([{
//               name: 'value',
//               type: 'input',
//               message: 'Enter searching value:',
//             }])
//             .then((answer) => {
//               if (data.includes(answer.value)) {
//                 console.log('This is your file')
//               } else {
//                 console.log('No ' + answer.value + ' in this file')
//               }
//             });
//         });
//       } else {
//         list = fs.readdirSync(currDir)
//         inq();
//       }
//     });
// }

// inq();