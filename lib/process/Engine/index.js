const rp = require('request-promise')
const async = require('async')
const log = require('../../log')
/* Process the request on /engine endpoint */

function process (id, action) {

  /* Execute the following functions in order and store their results in the results object
    httpStream -> Store req & res streams from Express for later use
    requestObject -> According to GM specs, create a request object for GM's API
    getHTTPdata -> Make request to GM's API and get data
    generateResponse -> According to Smartcar API specs, generate a response object
    sendResponse -> Send response object through the res stream from httpStream
    More documentation on async.auto here: https://caolan.github.io/async/docs.html#auto
  */

  return new Promise(function (resolve, reject) {
    async.auto({
      httpStream: function(callback) { httpStream(id, action, callback) },
      requestObject: ['httpStream', function(results, callback) { requestObject(results, callback) }],
      getHTTPdata: ['requestObject', function(results,callback) { getHTTPdata(results, callback) }],
      generateResponse: ['getHTTPdata', function(results, callback) { generateResponse(results, callback) }]
    }, function(err, results){
      if(err){
        log(err)
        reject("Internal Error")
      }
      resolve(results.generateResponse)
    })
  })

}

/* Store req & res streams from Express for later use */
function httpStream(id, action, callback){

  callback(null, {id: id, action: action})    //req -> results.httpStream.req , res -> results.httpStream.res

}

/*  According to GM specs, create a request object for GM's API */
function requestObject(results, callback){

  callback(null, {
    method: 'POST',
    uri: 'http://gmapi.azurewebsites.net/actionEngineService',
    body: {
      "id": results.httpStream.id,
      "command": results.httpStream.action + "_VEHICLE",
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


module.exports = process
