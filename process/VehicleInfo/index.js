const rp = require('request-promise')
const async = require('async')
const log = require('../../log')

function process (req, res) {

  /* Execute the following functions in order and store their results in the results object

    httpStream -> Store req & res streams from Express for later use
    requestObject -> Create a request object for GM's API according to GM specs
    getHTTPdata -> Make request to GM's API and get data
    generateResponse -> Generate a response object according to Smartcar specs
    sendResponse -> Send response object through the res stream from httpStream

    More documentation on async.auto here: https://caolan.github.io/async/docs.html#auto
  */

  async.auto({
    httpStream: function(callback) { httpStream(req, res, callback) },
    requestObject: ['httpStream', function(results, callback) { requestObject(results, callback) }],
    getHTTPdata: ['requestObject', function(results,callback) { getHTTPdata(results, callback) }],
    generateResponse: ['getHTTPdata', function(results, callback) { generateResponse(results, callback) }],
    sendResponse: ['generateResponse', function(results, callback) { sendResponse(results, callback) }]
  }, function(err, results){
    if(err)
      log(err)
  })

}

/* Store req & res streams from Express for later use */
function httpStream(req, res, callback){

  callback(null, {req: req, res: res})

}

/* Create a request object for GM's API according to GM specs */
function requestObject(results, callback){

  callback(null, {
    method: 'POST',
    uri: 'http://gmapi.azurewebsites.net/getVehicleInfoService',
    body: {"id": results.httpStream.req.params.id, "responseType": "JSON"},
    json: true
  })

}

/* Make request to GM's API and get data */
async function getHTTPdata(results, callback){

  await rp(results.requestObject).then(function(response){
    if(response.status == 200)
      callback(null, response.data)
    else{
      results.httpStream.res.status(404)
      results.httpStream.res.send("404, invalid ID")
    }
  })

}

/* Generate a response object according to Smartcar specs */
function generateResponse(results, callback){

  callback(null,  {
    "vin": results.getHTTPdata.vin.value,
    "color": results.getHTTPdata.color.value,
    "doorCount": results.getHTTPdata.fourDoorSedan.value ? 4 : 2,
    "driveTrain": results.getHTTPdata.driveTrain.value
  })

}

/* Send response object through the res stream from httpStream */
function sendResponse(results, callback){

  results.httpStream.res.status(200)
  results.httpStream.res.send(results.generateResponse)
  callback(null)

}

module.exports = process
