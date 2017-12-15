const rp = require('request-promise')
const async = require('async')
const process = require('../process')
const app = require('express')()
const bodyParser = require('body-parser')


//Express Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(8080)

console.log("Server listening on PORT 8080")

app.get('/vehicles/:id', function(req, res){
  console.log("GET /vehicles/:id")
  process('VehicleInfo', req, res)
})

app.get('/vehicles/:id/doors', function(req, res){
  console.log("GET /vehicles/:id/doors")
  process('Security', req, res)
})

app.get('/vehicles/:id/fuel', function(req, res){
  console.log("GET /vehicles/:id/fuel")
  process('FuelRange', req, res)
})

app.get('/vehicles/:id/battery', function(req, res){
  console.log("GET /vehicles/:id/battery")
  process('BatteryRange', req, res)
})

app.post('/vehicles/:id/engine', function(req, res){
  console.log("POST /vehicles/:id/engine")
  process('Engine', req, res)
})
