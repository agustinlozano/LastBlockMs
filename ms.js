const express = require('express')
const WebSocket = require('ws')

const config = require('./config/main.json')
const { WS_IP } = config
 
const app = express()

// parse application/json
app.use(express.json())

// current config
console.log({config})

// local config
// const LOCAL = 'ws://localhost:53024'
// console.log('Local IP:', LOCAL)
// const ws = new WebSocket(LOCAL);

// Create a WebSocket client
const WS_URL = `ws://${config.VM}.${WS_IP}`
const ws = new WebSocket(WS_URL);
console.log('WS_URL:', WS_URL)

app.get('/', (_, res) => {
  res.send(`
    <h1>Last Block Microservice</h1>
    <p>Send a POST request to /lastblock with a proper JSON payload</p>
  `)
})

app.post('/lastblock', (req, res) => {
  // access to the json payload sent by the client in the request
  const payload = req.body
  const { projectid, code } = payload

  console.log(`LB> ID: "${projectid}", Code: "${code}"`)

  // send block data as a websocket client to the websocket server
  ws.send(JSON.stringify({ projectid, code }))

  // send a response to the client
  res.send('OK, you are great!')
})

app.listen(config.PORT, () => {
  console.log(`\nServer started on port: ${config.PORT}\n`)
})
