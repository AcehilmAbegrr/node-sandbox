const buffer = new Buffer('Hello')

console.log(buffer.toString())

console.log(buffer.toString('base64'))

const buffer1 = new Buffer('World').toString('base64')
// Get subsection
console.log(buffer.toString('utf-8', 0, 2))