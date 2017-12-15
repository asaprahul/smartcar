const rp = require('request-promise')
const async = require('async')

function httpStream(req, res, callback){

  callback(null, {req: req, res: res})

}


function requestObject(results, callback){

  callback(null, {
    method: 'POST',
    uri: 'http://gmapi.azurewebsites.net/actionEngineService',
    body: {
      "id": results.httpStream.req.params.id,
      "command": results.httpStream.req.body.action + "_VEHICLE",
      "responseType": "JSON"
    },
    json: true
  })

}

async function getHTTPdata(results, callback){

  await rp(results.requestObject).then(function(response){
    if(response.status == 200 && response.actionResult)
      callback(null, response.actionResult)
    else{
      console.log(response.actionResult)
      results.httpStream.res.status(404)
      results.httpStream.res.send("404, invalid ID or action")
    }
  })

}

function generateResponse(results, callback){
  if(results.getHTTPdata.status === "EXECUTED")
    callback(null,  { "status": "success" })
  else if(results.getHTTPdata.status === "FAILED")
    callback(null, { "status": "error" })
  else
    results.httpStream.res.send("500. Error with performing actions on vehicle engine")
}

function sendResponse(results, callback){

  results.httpStream.res.status(200)
  results.httpStream.res.send(results.generateResponse)
  callback(null)

}

function process (req, res) {

  async.auto({
    httpStream: function(callback) { httpStream(req, res, callback) },
    requestObject: ['httpStream', function(results, callback) { requestObject(results, callback) }],
    getHTTPdata: ['requestObject', function(results,callback) { getHTTPdata(results, callback) }],
    generateResponse: ['getHTTPdata', function(results, callback) { generateResponse(results, callback) }],
    sendResponse: ['generateResponse', function(results, callback) { sendResponse(results, callback) }]
  }, function(err, results){
    if(err)
      console.log(err)
  })

}

module.exports = process
