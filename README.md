## LastBlock Microservice
This is a microservice that provide an endpoint to set the last certified block. It has to be used after an whatapp certifing event.

### Usage
- Method: POST
- base url: https://lastblockms.onrender.com
- Endpoint: /lastblock
- Body:
```json
{
  "code": "0018R",
  "projectid": "00Jusyx_92cvcDuDVEPwUo"
}
```

### Response Ok
```json
{
  "status": "OK",
  "description": "Successful",
  "message": "Block was sent to the websocket server"
}
```

### Response ERROR
```json
{
  "status": "ERROR",
  "description": "Invalid payload",
  "message": "Payload must contain projectid and code"
}
```