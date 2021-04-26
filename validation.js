// Validate Enter Carpark Line Data
// Expected data: Enter <motorcycle|car> <vehicle number> <timestamp>
function validateEnterData (line) {
    let event = line.split(' ')
    if (event.length !== 4) {
      return false
    } else if (event[0] !== 'Enter') {
      return false
    } else if (event[1] !== 'car' && event[1] !== 'motorcycle') {
      return false
    } else if (!/^\d+$/.test(event[3])) {
      return false
    } else {
      // validate vehicle number. Valid data: SGX1234A
      let vehicleNumber = event[2]
      if (vehicleNumber.length !== 8) {
        return false
      }
      for (let i = 0; i < vehicleNumber.length; i++) {
        let character = vehicleNumber[i]
        if (i < 4 || i === 7) {
          if (character !== character.toUpperCase()) {
            return false
          }
        }
        if (i >= 3 && i <= 6) {
          if (!/^\d+$/.test(character)) {
            return false
          }
        }
      }
    }
    return true
  }
  
  // Validate Exit Carpark Line Data
  // Expected data: Exit <vehicle number> <timestamp>
  function validateExitData (line) {
    let event = line.split(' ')
    if (event.length !== 3) {
      return false
    } else if (event[0] !== 'Exit') {
      return false
    } else if (!/^\d+$/.test(event[2])) {
      // validate timestamp
      return false
    } else {
      // validate vehicle number. Valid data: SGX1234A
      let vehicleNumber = event[1]
      if (vehicleNumber.length !== 8) {
        return false
      }
      for (let i = 0; i < vehicleNumber.length; i++) {
        let character = vehicleNumber[i]
        if (i < 4 || i === 7) {
          if (character !== character.toUpperCase()) {
            return false
          }
        }
        if (i >= 3 && i <= 6) {
          if (!/^\d+$/.test(character)) {
            return false
          }
        }
      }
    }
    return true
  }

  module.exports = {
    validateEnterData,
    validateExitData
}