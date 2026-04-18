const http = require('http')
const port = 3000

const server = http.createServer(function(req, res) {
    res.write('whats up')
    res.end()
})

server.listen(port, function(error) {
    if (error){
        console.log('error: ', error)
    } else {
        console.log('listening on port ', port)
    }
})