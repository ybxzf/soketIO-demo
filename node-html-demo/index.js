const { Socket } = require('dgram');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8888;

//为html页面配置路由
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//开启连接
io.on('connection', (socket) => {
  console.log('一个用户连接');
  //监听客户端发送的信息
  socket.on('chat message', msg => {
    //想客户端广播信息
    io.emit('chat message', msg);
  });
  socket.on('disconnect',()=>{
    console.log('一个用户断开');
  })
});

//监听端口
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
