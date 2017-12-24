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
          Security(req, res)
          break
      case 'FuelRange':
          FuelRange(req, res)
          break
      case 'BatteryRange':
          BatteryRange(req, res)
          break
      case 'Engine':
          Engine(req, res)
          break
      default:
          log(endpoint + ' endpoint does not exist!')
          res.status(404)
          res.send('404. Endpoint does not exist')
  }
}
