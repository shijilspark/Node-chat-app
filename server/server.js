const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000;
var app = express ();

var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
  console.log("New user connected")

  socket.emit('newMessage', generateMessage('Admin','Welcome to node Chat'));
  // socket.emit('newMessage',{
  //   from:'Admin',
  //   text: 'Welcome to node chat app Branch',
  //   createdAt: new Date().getTime()
  // })
  socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined'))
  // socket.broadcast.emit('newMessage',{
  //   from: 'Admin',
  //   text: 'New user joined',
  //   createdAt: new Date().getTime()
  // })
  // socket.emit('newEmail',{
  //   from: 'mike@example.com',
  //   text: 'Hey what is going on',
  //   createdAt: 123,
  // })
  // socket.emit('newMessage',{
  //   from: 'ServerKing',
  //   text: 'This is a message from Server',
  //   createdAt: 123
  // })
  // socket.on('createEmail',(clientMail)=>{
  //   console.log('Mail from client',clientMail)
  // })
  socket.on('createMessage',(message, callback)=>{
    console.log('Message from client', message);
    // io.emit('newMessage',{
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
      io.emit('newMessage',generateMessage(message.from, message.text))
      callback('This message is from server')

    // // socket.broadcast.emit('newMessage',{
    // //   from: 'Server message',
    // //   text: 'Whats up clients',
    // //   createdAt: new Date().getTime()
    //
    // })
  })

  socket.on('disconnect',()=>{
    console.log("User is disconnected")
  })
})

server.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})
console.log(publicPath);
