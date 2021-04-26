const fs = require("fs")
const chalk = require("chalk")
const readline = require('readline')
const { enterCarpark, exitCarpark, saveOutputToFile } = require('./functions')
const { validateEnterData, validateExitData } = require('./validation')

const args = process.argv

// main method to execute
function execute(args) {
  // clear output file
  fs.truncate('./output.txt', 0, function(){})
  let fileName = args[2]
  let fileExtension = fileName.split('.').pop()
  if (fileExtension === 'txt') {
    processFileLineByLine(fileName)
  } else {
    console.log(chalk.red('Error occurred - Please input .txt files only.'))
    saveOutputToFile('Error occurred - Please input .txt files only.')
  }
}

// Process specified data file in inputFiles directory line by line
async function processFileLineByLine(fileName) {
  // create file stream and validate file exists within ./inputFiles directory
  const fileStream = await fs.createReadStream(`./inputFiles/${fileName}`).on('error', (err) => {
    console.log(chalk.red('Error occurred - Unable to locate file.'))
    saveOutputToFile('Error occurred - Unable to locate file.')
  })
  // read file line by line
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  let counter = 0
  // initialize car parking slot
  let cpSlotCounter = 0
  let cpLots = []
  // initalize motorcycle parking slot
  let mcpSlotCounter = 0
  let mcpLots = []

  // to validate if error occured in the first line
  let errorOccurred = false
  for await (const line of rl) {
    counter++
    if (!errorOccurred) {
      // first line in file will indicate parking slots present in the parking lots
      if (counter === 1) {
        try {
          let slots = line.split(' ')
          // initialize parking lots array with defined parking slots in file
          // fill array with 0 to indicate empty parking lot
          cpSlotCounter = slots[0]
          cpLots = new Array(parseInt(slots[0])).fill(0)
          mcpSlotCounter = slots[1]
          mcpLots = new Array(parseInt(slots[1])).fill(0)
        } catch (err) {
          console.log(chalk.red(`Error occurred at line ${counter} - Invalid format for parking slots.`))
          await saveOutputToFile(`Error occurred at line ${counter} - Invalid format for parking slots.`)
          errorOccurred = true
        }
      } else {
        let event = line.split(' ')
        let action = event[0]
        if (action === 'Enter') {
          // validate line data format
          if (!validateEnterData(line)) {
            console.log(chalk.red(`Error occurred at line ${counter} - Invalid data.`))
            await saveOutputToFile(`Error occurred at line ${counter} - Invalid data.`)
          } else {
            let type = event[1]
            let slots = enterCarpark(type, line, cpLots, cpSlotCounter, mcpLots, mcpSlotCounter, counter)
            cpSlotCounter = slots[0]
            mcpSlotCounter = slots[1]
          }
        } else if (action === 'Exit') {
          // validate line data format
          if (!validateExitData(line)) {
            console.log(chalk.red(`Error occurred at line ${counter} - Invalid data.`))
            await saveOutputToFile(`Error occurred at line ${counter} - Invalid data.`)
          } else {
            let exitType = exitCarpark(event, cpLots, mcpLots, counter)
            if (exitType && exitType === 'Car') {
              cpSlotCounter++
            } else if (exitType && exitType === 'Motorcycle') {
              mcpSlotCounter++
            }
          }
        } else {
          // invalid data for any other action aside from Enter and Exit
          console.log(chalk.red(`Error occurred at line ${counter} - Invalid data.`))
          await saveOutputToFile(`Error occurred at line ${counter} - Invalid data.`)
        }
      }
    }
  }
}

// execute main method
execute(args)
