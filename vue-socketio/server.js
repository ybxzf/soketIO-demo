const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io')

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});


chat = (io) => {
  let count = 0

  //开启连接
  io.on('connection', socket => {
    count++
    console.log(count + ' user connected')
    //监听客户端
    socket.on('send_msg', (data) => {

      console.log(`收到客户端的消息：${data.input}`)

      //给客户端广播信息
      io.sockets.emit('receive_msg', {
        username: 'server',
        receive: data.input
      })


    })

    //断开连接
    socket.on('disconnect', () => {
      count--
      console.log('a user disconnected');
    });

  });



}
chat(io)

server.listen('3001', () => {
  console.log('正在监听port:3001...')
});

// module.exports = {
//   chat
// }