//let vehicleInfo = require('../lib/process/VehicleInfo')
const assert = require('chai').assert
const expect = require('chai').expect
const request = require('supertest')

describe('VehicleInfo Handler Function', function(){

  it('Checking all properties', async function(){
    let vehicleInfo = await require('../lib/process/VehicleInfo')(1234)
    assert.hasAllKeys(vehicleInfo, ['vin', 'color', 'doorCount', 'driveTrain'])
  })

  it('value of vin', async function(){
    let vehicleInfo = await require('../lib/process/VehicleInfo')(1234)
    assert.equal(vehicleInfo.vin, "123123412412")
  })

  it('value of color', async function(){
    let vehicleInfo = await require('../lib/process/VehicleInfo')(1234)
    assert.equal(vehicleInfo.color, "Metallic Silver")
  })

  it('value of doorCount', async function(){
    let vehicleInfo = await require('../lib/process/VehicleInfo')(1234)
    assert.equal(vehicleInfo.doorCount, 4)
  })

  it('value of driveTrain', async function(){
    let vehicleInfo = await require('../lib/process/VehicleInfo')(1234)
    assert.equal(vehicleInfo.driveTrain, "v8")
  })

})
