const fs = require("fs");
const chalk = require("chalk")

// function to handle 'Enter' action. When vehicles enter carpark
// if vehicle successfully parks, replace the first 0 in cpLots or mcpLots array with vehicle information
function enterCarpark (type, line, cpLots, cpSlotCounter, mcpLots, mcpSlotCounter, counter) {
  try {
    if (type === 'car') {
      if (cpSlotCounter > 0) {
        for (let i = 0; i < cpLots.length; i++) {
          // detect first empty parking slot
          if (cpLots[i] === 0) {
            // replace empty slot value 0 with vehicle information
            cpLots[i] = line
            console.log('Accept CarLot' + (i+1))
            saveOutputToFile('Accept CarLot' + (i+1))
            break
          }
        }
        cpSlotCounter--
      } else {
        console.log('Reject')
        saveOutputToFile('Reject')
      }
    } else if (type === 'motorcycle') {
      if (mcpSlotCounter > 0) {
        for (let i = 0; i < mcpLots.length; i++) {
          // detect first empty parking slot
          if (mcpLots[i] === 0) {
            // replace empty slot value 0 with vehicle information
            mcpLots[i] = line
            console.log('Accept MotorcycleLot' + (i+1))
            saveOutputToFile('Accept MotorcycleLot' + (i+1))
            break
          }
        }
        mcpSlotCounter--
      } else {
        console.log('Reject')
        saveOutputToFile('Reject')
      }
    } else {
      console.log(chalk.red('Error occurred - Invalid vehicle type.'))
      saveOutputToFile(`Error occurred at line ${counter} - Invalid vehicle type.`)
    }
  } catch (err) {
    console.log(chalk.red(`Error occurred at line ${counter} - Invalid data.`))
    saveOutputToFile(`Error occurred at line ${counter} - Invalid data.`)
  }
  return [cpSlotCounter, mcpSlotCounter]
}
  
// function to handle 'Exit' action. When vehicles exit carpark
// if vehicle successfully exits, empty the lot by replacing the vehicle information in the respective vehicle lots array with 0
function exitCarpark (event, cpLots, mcpLots, counter) {
  let vehicleNumber = event[1]
  let startTime = ''
  let endTime = parseInt(event[2])
  let type = ''
  let lotNumber = 0
  let foundVehicle = false

  // Search for vehicle in car parking lots
  for (let i = 0; i < cpLots.length; i++) {
    if (cpLots[i] !== 0) {
      let info = cpLots[i].split(' ')
      let vehicleNum = info[2]
      if (vehicleNumber === vehicleNum) {
        type = 'Car'
        lotNumber = i+1
        startTime = parseInt(info[3])
        if (endTime > startTime) {
          // empty lot by assigning value = 0
          cpLots[i] = 0
          let fee = calculateFee(type, startTime, endTime)
          console.log(`${type}Lot${lotNumber} ${fee}`)
          saveOutputToFile(`${type}Lot${lotNumber} ${fee}`)
          return type
        } else {
          console.log(chalk.red(`Error occurred at line ${counter} - Vehicle exit time is earlier or equal to enter time.`))
          saveOutputToFile(`Error occurred at line ${counter} - Vehicle exit time is earlier or equal to enter time.`)
        }
        foundVehicle = true
      }
    }
  }

  // Search for vehicle in motorcycle parking lots
  for (let i = 0; i < mcpLots.length; i++) {
    if (mcpLots[i] !== 0) {
      let info = mcpLots[i].split(' ')
      let vehicleNum = info[2]
      if (vehicleNumber === vehicleNum) {
        type = 'Motorcycle'
        lotNumber = i+1
        startTime = info[3]
        if (endTime > startTime) {
          // empty lot by assigning value = 0
          mcpLots[i] = 0
          let fee = calculateFee(type, startTime, endTime)
          console.log(`${type}Lot${lotNumber} ${fee}`)
          saveOutputToFile(`${type}Lot${lotNumber} ${fee}`)
          return type
        } else {
          console.log(chalk.red(`Error occurred at line ${counter} - Vehicle exit time is earlier or equal to enter time.`))
          saveOutputToFile(`Error occurred at line ${counter} - Vehicle exit time is earlier or equal to enter time.`)
        }
        foundVehicle = true
      }
    }
  }

  if (!foundVehicle) {
    console.log(chalk.red(`Error occurred at line ${counter} - Vehicle number ${vehicleNumber} cannot be found within parking lots.`))
    saveOutputToFile(`Error occurred at line ${counter} - Vehicle number ${vehicleNumber} cannot be found within parking lots.`)
  }

}
  
// Calculate parking fee
function calculateFee (type, startTime, endTime) {
  let time = (endTime - startTime) / 3600
  let rate = 0
  if (type === 'Car') {
    rate = 2
  } else if (type === 'Motorcycle') {
    rate = 1
  }
  let fee = Math.ceil(time * rate)
  return fee
}

// save output to file for easier viewing or for logging purposes
function saveOutputToFile (output) {
  fs.appendFileSync('./output.txt', output + '\n', function (err) {
    if (err) throw err
  })
}

  module.exports = {
    enterCarpark,
    exitCarpark,
    calculateFee,
    saveOutputToFile
}