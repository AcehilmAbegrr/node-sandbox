const cluster = require('cluster')
const http = require('http')
const num_workers = 2

if (cluster.isMaster) {
    for (let i = 0; i < num_workers; i++) {
        console.log('master: about to fork a worker')
        cluster.fork()
    }

    cluster.on('fork', (worker) => {
        console.log(`master: fork event (worker ${worker.id})`)
    })

    cluster.on('online', (worker) => {
        console.log(`master: online event (worker ${worker.id})`)
    })

    cluster.on('listening', (worker, address) => {
        console.log(`master: listening event (worker ${worker.id}, pid ${worker.process.pid}, ${address.address}, ${address.port})`)
    })

    cluster.on('exit', (worker, code, signal) => {
        console.log(`master: exit event (worker ${worker.id})`)
    })
} else {
    console.log(`worker: worker #${cluster.worker.id} is ready!`)

    let count = 0

    http.createServer((req, res) => {
        res.writeHead(200)
        count++
        console.log(`Worker #${cluster.worker.id} is inrementing count to ${count}`)
        res.end(`message from worker#${cluster.worker.id} (pid ${cluster.worker.process.pid}) with count = ${count}`)
        if (count === 3) {
            cluster.worker.destroy()
        }
    }).listen(3000)
}