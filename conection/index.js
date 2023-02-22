const WebSocket = require('ws')

// Create a WebSocket client
function connectWsClient (config) {
  const WS_URL = `ws://${config.VM}.${config.WS_IP}`
  const ws = new WebSocket(WS_URL);
  console.log('WS_URL:', WS_URL)

  // local config
  // const LOCAL = 'ws://localhost:53024'
  // console.log('Local IP:', LOCAL)
  // const ws = new WebSocket(LOCAL);
    

  return ws
}

module.exports = { connectWsClient }