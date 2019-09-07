const fs = require('fs')

const read_file_as_array = (file) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                return reject(err)
            }

            const lines = data.toString().trim().split('\n')
            resolve(lines)
        })
    })
}

read_file_as_array('./numbers.txt')
    .then(lines => {
        const numbers = lines.map(Number)
        const odd_numbers = numbers.filter(number => number % 2 !== 0)
        console.log(`odd numbers count: ${odd_numbers.length}`)
    })
    .catch(console.error)

const count_odd = async() => {
    try {
        const lines = await read_file_as_array('./numbers.txt')
        const numbers = lines.map(Number)
        const odd_numbers = numbers.filter(number => number % 2 !== 0)
        console.log(`odd numbers count: ${odd_numbers.length}`)
    } catch (error) {
        console.error(error)
    }
}

count_odd()

