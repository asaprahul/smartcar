const VehicleInfo = require('./VehicleInfo')
const Security = require('./Security')
const FuelRange = require('./FuelRange')
const BatteryRange = require('./BatteryRange')
const Engine = require('./Engine')
const log = require('../log')

module.exports = async function(endpoint, req, res){

    /* Channel the req & res streams to appropriate handler function */
    switch (endpoint) {
      case 'VehicleInfo':
          res.status(200)
          res.send(await VehicleInfo(req.params.id))
          break
      case 'Security':
          res.status(200)
          res.send(await Security(req.params.id))
          break
      case 'FuelRange':
          res.status(200)
          res.send(await FuelRange(req.params.id))
          break
      case 'BatteryRange':
          res.status(200)
          res.send(await BatteryRange(req.params.id))
          break
      case 'Engine':
          res.status(200)
          res.send(await Engine(req.params.id, req.body.action))
          break
      default:
          log(endpoint + ' endpoint does not exist!')
          res.status(404)
          res.send('404. Endpoint does not exist')
  }
}
