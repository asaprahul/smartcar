const processor = require('../process')
const app = require('express')()
const bodyParser = require('body-parser')
const log = require('../log')

/* Express Middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(process.env.PORT || 3000)

log("Server listening on PORT 3000")

/* Listeners for Smartcar API's endpoints */

app.get('/vehicles/:id', function(req, res){
  log("GET /vehicles/:id")
  processor('VehicleInfo', req, res)    //Process for VehicleInfo endpoint, pass on req & res streams
})

app.get('/vehicles/:id/doors', function(req, res){
  log("GET /vehicles/:id/doors")
  processor('Security', req, res)       //Process for Security endpoint, pass on req & res streams
})

app.get('/vehicles/:id/fuel', function(req, res){
  log("GET /vehicles/:id/fuel")
  processor('FuelRange', req, res)     // Process for FuelRange endpoint, pass on req & res streams
})

app.get('/vehicles/:id/battery', function(req, res){
  log("GET /vehicles/:id/battery")
  processor('BatteryRange', req, res)  //Process for BatteryRange endpoint, pass on req & res streams
})

app.post('/vehicles/:id/engine', function(req, res){
  log("POST /vehicles/:id/engine")
  processor('Engine', req, res)       //Process for Engine Start/Stop endpoint, pass on req & res streams
})
