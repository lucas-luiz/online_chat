const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')

const app = express()
const server = app.listen(3000)
const { Server } = require("socket.io")
const io = new Server(server)

const port = 3000

db = {
    messages: ["that's the chat"]
}


app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html')

})
app.get('/messages', (req, res) => {
    res.send(JSON.stringify(db))
})

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('message', (data) => {
        console.log('SOCKET: ' + data)
        io.emit('message', data)
    })
})


app.post('/', (req, res) => {
    console.log('EXPRESS: ' + req.body.message)
    db.messages.push(req.body.message)
    res.send(req.body.message)
})

