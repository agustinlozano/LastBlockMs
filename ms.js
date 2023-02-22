const express = require('express')
const { connectWsClient } = require('./conection')
const config = require('./config/main.json')
 
const app = express()

// parse application/json
app.use(express.json())

// current config
console.log({config})

app.get('/', (_, res) => {
  res.send(`
    <h1>Last Block Microservice</h1>
    <p>Send a POST request to /lastblock with a proper JSON payload</p>
  `)
})

app.post('/lastblock', (req, res) => {
  const ws = connectWsClient(config)
  
  // access to the json payload sent by the client in the request
  const payload = req.body
  const { projectid, code } = payload

  // validate payload
  if (!projectid || !code) {
    const response = {
      status: 'ERROR',
      description: 'Invalid payload',
      message: 'Payload must contain projectid and code'
    }
    return res.send(response)
  }

  console.log('LB> paylod', { projectid, code })

  // when ws client is connected send the payload
  ws.on('open', () => {
    // send block data as a websocket client to the websocket server
    ws.send(JSON.stringify({ projectid, code }))
  })

  // send a response after POST request
  const response = {
    status: 'OK',
    description: 'Successful',
    message: 'Block was sent to the websocket server'
  }
  res.send(response)
})

app.listen(config.PORT, () => {
  console.log(`\nServer started on port: ${config.PORT}\n`)
})
