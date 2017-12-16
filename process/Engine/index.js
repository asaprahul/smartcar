const rp = require('request-promise')
const async = require('async')

/* Process the request on /engine endpoint */

function process (req, res) {

  /* Execute the following functions in order and store their results in the results object

    httpStream -> Store req & res streams from Express for later use
    requestObject -> According to GM specs, create a request object for GM's API
    getHTTPdata -> Make request to GM's API and get data
    generateResponse -> According to Smartcar API specs, generate a response object
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

  callback(null, {req: req, res: res})    //req -> results.httpStream.req , res -> results.httpStream.res

}

/*  According to GM specs, create a request object for GM's API */
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

/* Make request to GM's API and get data */
async function getHTTPdata(results, callback){

  await rp(results.requestObject).then(function(response){
    if(response.status == 200 && response.actionResult)
      callback(null, response.actionResult)
    else{
      log(response.actionResult)
      results.httpStream.res.status(404)
      results.httpStream.res.send("404, invalid ID or action")
    }
  })

}

/* According to Smartcar API specs, generate a response object */
function generateResponse(results, callback){
  if(results.getHTTPdata.status === "EXECUTED")
    callback(null,  { "status": "success" })
  else if(results.getHTTPdata.status === "FAILED")
    callback(null, { "status": "error" })
  else
    results.httpStream.res.send("500. Error with performing actions on vehicle engine")
}

/* Send response object through the res stream from httpStream */
function sendResponse(results, callback){

  results.httpStream.res.status(200)                         // simply res.status()
  results.httpStream.res.send(results.generateResponse)      // simply res.send()
  callback(null)

}


module.exports = process
