const hre = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
  let simpleStorage, SimpleStorage // so that it() can access these variables
  // deploy the smart contract first
  beforeEach(async function () {
    SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorage.deploy()
  })

  it("Should start with a favourite number of zero", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should update when we call store", async function () {
    const expectedValue = "7"
    const txResponse = await simpleStorage.store(expectedValue)
    await txResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
})
