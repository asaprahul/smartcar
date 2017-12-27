//let vehicleInfo = require('../lib/process/VehicleInfo')
const assert = require('chai').assert
const expect = require('chai').expect
const request = require('supertest')

describe('/VehicleInfo Handler Function', function(){

  it('Checking all properties', async function(){
    let vehicleInfo = await require('../lib/process/VehicleInfo')(1234)
    assert.hasAllKeys(vehicleInfo, ['vin', 'color', 'doorCount', 'driveTrain'])   //Contains all properties
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


describe('/Security Handler Function', function(){

  it('Response is an Array', async function(){
    let Security = await require('../lib/process/Security')(1234)       //Response should be Array
    assert.isArray(Security)
  })

  it('Back Right Door', async function(){
    let Security = await require('../lib/process/Security')(1234)
    assert.hasAnyKeys(Security[0], {"locked" : true, "locked": false})  //Should have locked: true or locked: false
  })

  it('Front Right Door', async function(){
    let Security = await require('../lib/process/Security')(1234)
    assert.hasAnyKeys(Security[1], {"locked" : true, "locked": false})
  })

  it('Front Left Door', async function(){
    let Security = await require('../lib/process/Security')(1234)
    assert.hasAnyKeys(Security[2], {"locked" : true, "locked": false})
  })

  it('Back Left Door', async function(){
    let Security = await require('../lib/process/Security')(1234)
    assert.hasAnyKeys(Security[3], {"locked" : true, "locked": false})
  })

})

describe('/FuelRange Handler Function', function(){

  it('Checking percent property', async function(){
    let FuelRange = await require('../lib/process/FuelRange')(1234)
    assert.hasAllKeys(FuelRange, ['percent'])                         //Contains all properties
  })

})

describe('/BatteryRange Handler Function', function(){

  it('Checking percent property', async function(){
    let BatteryRange = await require('../lib/process/BatteryRange')(1234)
    assert.hasAllKeys(BatteryRange, ['percent'])                         //Contains all properties
  })

})

describe('/Engine Handler Function', function(){

  it('START Vehicle', async function(){
    let Engine = await require('../lib/process/Engine')(1234, "START")
    assert.hasAnyKeys(Engine, {"status" : "success", "status": "error"})                       //Contains all properties
  })

  it('STOP Vehicle', async function(){
    let Engine = await require('../lib/process/Engine')(1234, "STOP")
    assert.hasAnyKeys(Engine, {"status" : "success", "status": "error"})                       //Contains all properties
  })

})
