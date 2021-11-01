const fs = require('fs');

const ACCESS_LOG = '../../access.log';

const search1 = '89.123.1.41';
const search2 = '34.48.240.111';

const regex1 = new RegExp(search1 + '.*', 'g');
const regex2 = new RegExp(search2 + '.*', 'g');

let result1 = [];
let result2 = [];

const readStream = fs.createReadStream(ACCESS_LOG, 'utf8');

const writeStream1 = fs.createWriteStream('./' + search1 + '_requests.log', {
  flags: 'a', encoding: 'utf8'
});
const writeStream2 = fs.createWriteStream('./' + search2 + '_requests.log', {
  flags: 'a', encoding: 'utf8'
});

const { Transform } = require('stream');

const newData = new Transform({
  transform(chunk, encoding, callback) {
    chunk = chunk.toString()
    if (chunk.startsWith('89.123.1.41')) {
      result1.push(chunk)
    }
    if (chunk.startsWith('34.48.240.111')) {
      result2.push(chunk)
    }
    callback();
  }
});

const writeData = new Transform({
  transform(chunk, encoding, callback) {
    result1.forEach(e => {
      writeStream1.write(e);
      writeStream1.write('\n')
    });
    result2.forEach(e => {
      writeStream2.write(e);
      writeStream2.write('\n')
    });
    callback();
  }
});

readStream.pipe(newData).pipe(writeData);