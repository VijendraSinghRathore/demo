const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});



app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, "public", "index.html")
    res.sendFile(indexPath)
})


//Socket
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})