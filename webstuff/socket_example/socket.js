const http = require('http')
const socketio = require('socket.io')
const fs = require('fs')

const handler = (req, res) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (!err) {
            res.writeHead(200)
            res.end(data)
        } else {
            res.writeHead(500)
            return res.end(`Error loading index.html: ${err}`)
        }
    })
}

const app = http.createServer(handler)
let io = socketio.listen(app)

io.sockets.on('connection', (socket) => {
    setInterval(() => {
        const timestamp = new Date()
        console.log(`Emitted: ${timestamp}`)
        socket.emit('timer', timestamp)
    }, 1000)
    socket.on('submit', (data) => {
        console.log(`Submitted: ${data}`)
    })
})
app.listen(8080)
console.log('Server is running!')