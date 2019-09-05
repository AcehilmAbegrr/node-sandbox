const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    if (req.url ==='/file.txt') {
        fs.createReadStream(__dirname + '/file.txt').pipe(res)
    } else {
        res.end('Hello world')
    }
}).listen(3000, 'localhost')
console.log('Server is running!')