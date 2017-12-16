const frisby = require('frisby')
const async = require('async')


/*
  Frisby makes a GET or POST request to an API endpoint and
  compares the response to determine if the endpoint is working or not.
*/


/* Tests VehicleInfo Endpoint */
const vehicleInfo = function(callback) {

  console.log(" ")
  console.log("  Testing  GET/vehicles/:id")

  frisby
    .get('http://localhost:3000/vehicles/1234')
    .expect('status', 200)
    .expect('json', {
      "vin" : "123123412412",
      "color" : "Metallic Silver",
      "doorCount" : 4,
      "driveTrain" : "v8"
    })
    .then(function(res){
      logResponse(res, callback)
    })
}

/* Tests Security Endpoint */
const security = function(callback) {

  console.log(" ")
  console.log("  Testing  GET/vehicles/:id/doors")

  frisby
    .get('http://localhost:3000/vehicles/1234/doors')
    .expect('status', 200)
    .then(function(res){
      logResponse(res, callback)
    })
}

/* Tests Fuel Endpoint */
const fuel = function(callback) {

  console.log(" ")
  console.log("  Testing  GET/vehicles/:id/fuel")

  frisby
    .get('http://localhost:3000/vehicles/1234/fuel')
    .expect('status', 200)
    .then(function(res){
      logResponse(res, callback)
    })
}

/* Tests Battery Endpoint */
const battery = function(callback) {

  console.log(" ")
  console.log("  Testing  GET/vehicles/:id/battery")

  frisby
    .get('http://localhost:3000/vehicles/1234/battery')
    .expect('status', 200)
    .then(function(res){
      logResponse(res, callback)
    })
}

/* Tests START Engine endpoint */
const engineSTART = function(callback) {

  console.log(" ")
  console.log("  Testing (START)  GET/vehicles/:id/engine")

  frisby
    .post('http://localhost:3000/vehicles/1234/engine', { "action" : "START" })
    .expect('status', 200)
    .then(function(res){
      logResponse(res, callback)
    })
}

/* Tests STOP Engine endpoint */
const engineSTOP = function(callback) {

  console.log(" ")
  console.log("  Testing (STOP) GET/vehicles/:id/engine")

  frisby
    .post('http://localhost:3000/vehicles/1234/engine', { "action" : "STOP" })
    .expect('status', 200)
    .then(function(res){
      logResponse(res, callback)
    })
}

/* Log the Test Results in a particular format */
const logResponse = function(res, callback){
  console.log("  ")
  console.log(" ", res.body)
  console.log("  ")
  console.log(" ", "TEST SUCCESS")
  console.log("  ")
  callback(null, null)
}

async.auto({
  vehicleInfo: function(callback){ vehicleInfo(callback) },
  security: ['vehicleInfo', function(results, callback){ security(callback) }],
  fuel: ['security', function(results, callback){ fuel(callback) }],
  battery: ['fuel', function(results, callback){ battery(callback) }],
  engineSTART: ['battery', function(results, callback){ engineSTART(callback) }],
  engineSTOP: ['engineSTART', function(results, callback){ engineSTOP(callback) }]
}, function(err, results){
    if(err)
      console.log(err)
})
