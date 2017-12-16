const VehicleInfo = require('./VehicleInfo')
const Security = require('./Security')
const FuelRange = require('./FuelRange')
const BatteryRange = require('./BatteryRange')
const Engine = require('./Engine')

module.exports = function(endpoint, req, res){
    switch (endpoint) {
      case 'VehicleInfo':
          VehicleInfo(req, res)
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
