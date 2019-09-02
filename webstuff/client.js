const http = require('http')

const options = {
    host: 'www.google.com',
    port: 80,
    path: '/',
    method: 'GET'
}

console.log('About to make request...')

http.get(options, (response) => {
    console.log(response.statusCode)
    response.pipe(process.stdout)
})
