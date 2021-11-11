const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  const readStream = fs.createReadStream(indexPath);

  readStream.pipe(res);
});

const io = socket(server);
const clientNames = ['vasya', 'petya', 'kolya', 'tanya', 'dima', 'fedya', 'yura', 'dasha', 'toyota supra']

io.on('connection', client => {
  client.id = clientNames[Math.floor(Math.random() * clientNames.length)];

  const connectMessageArr = ['Client ', [client.id], ' was connected.']
  const connectMessage = connectMessageArr.join('');
  console.log(connectMessage)
  client.broadcast.emit('clientConnected', connectMessage)


  client.on('client-msg', data => {
    const payload = {
      // message: data.message.split('').reverse().join(''),'
      author: client.id,
      message: data.message,
    };

    client.broadcast.emit('server-msg', payload);
    // client.emit('server-msg', payload);
  });

  client.on('disconnect', (reason) => {
    const disconnectMessageArr = ['Client ', [client.id], ' was disconnected.', reason]
    const disconnectMessage = disconnectMessageArr.join('');
    console.log(disconnectMessage)
    client.broadcast.emit('clientDisconnected', disconnectMessage)
  })
});

server.listen(5555);
