# Zendesk Backend Exercise
A CLI application in Node.js which is an automated valet car parking system where you manage a parking space for vehicles as they enter/exit it and manage its revenue.

- Node Version: v12.20.1 (https://nodejs.org/en/blog/release/v12.20.1/)
- Npm Version: 6.14.10 (https://www.npmjs.com/package/npm/v/6.14.10)

# Assumptions:
- As this is a CLI application, functions will only print results and not return any values. Also in the case of any error, functions will print human readable text instead of throwing an error for a smoother user experience.
- Only .txt files are valid inputs. Any other file formats are not accepted.
- First line in the input file will always be 2 space delimited numbers. e.g. 3 4
- Second line onwards will contain two types of events:
    - Vehicle entering the space: ​```Enter <motorcycle|car> <vehicle number> <timestamp>```​. The program should print out either ​accept or ​reject based on the availability of lots in the parking space. If the vehicle is accepted, the program also returns the name of the lot being occupied by it.
    - Vehicle exiting the space: ​```Exit <vehicle number> <timestamp>​```. The program prints out the released lot and the parking fee.
- If any of the above format is not valid, the vehicle will be ignored and an error message will be printed in red.
- Vehicle number should be unique regardless of vehicle type (motorcycle or car) hence the application assumes that there will not be a case where vehicles of the same vehicle number enter without exiting first and thus does not check for this scenario.
- The vehicle number upon exit should exist within the existing vehicle parking lot, otherwise an error will be shown as it is assumed this vehicle entered the carpark illegally.
- Timestamp is assumed to be of 10 digit unix timestamp format which is the number of seconds after 1 Jan 1970. Hence, to get the time (in seconds) each vehicle took between entry and exit, we can simply deduct the entry time from exit time without a need for time format conversion.
- Exit time of a vehicle that is earlier than or equal to the entry time is considered invalid and an error will be shown.

# How to run it:
```
$ git clone https://github.com/JoshCheng/zendesk-assignment.git
$ cd zendesk-assignment
$ npm install
$ node main demo.txt
```

Note: the fileName value in ```node main <fileName>``` will contain the file extension and the application will read the file from the ./inputFiles directory. Replace ```<filename>``` with any other file in the inputFiles folder to run that particular test case.

# Package dependencies:
- chalk - For colour of text for user experience

# Folder structure:
```
|-- inputFiles
| |-- ...input files
| |-- expectedOutput
| |-- |-- ...expected output files
|-- .gitignore
|-- functions.js
|-- main.js
|-- output.txt
|-- package-lock.json
|-- package.json
|-- README.md
|-- validation.js
```
- Main file to run would be main.js.
- Input file to run would be in the inputFiles folder.
- Expected output for test cases in input file would be in expectedOutput folder of the corresponding file name
- Functions file would contain carpark functions.
- Validation file would contain validation functions.
- Output would be saved in output.txt. (contents replaced for each run)

# Files in inputFiles
- demo.txt -> input file as per given in backend exercise pdf
- test.js -> invalid file format
- test1.txt -> invalid line format for each segment e.g. enter1 car2 SGX1234A12 111abc
- test2.txt -> vehicle lot is full, for both car and motorcycle and also if the vehicle states to exit but does not exist in the parking system
- test3.txt -> invalid parking lots present. e.g. a b
- test4.txt -> invalid case where vehicle exit timestamp is earlier than entry timestamp

# Approach Taken:
Step 1: Read and understand requirements of Automated Valet Car Parking System and state assumptions when necessary

Step 2: Set up file and code structure of CLI application in an extensible manner

Step 3: Write up main executable code for main.js

Step 4: Write up enter and exit carpark functions in carpark.js

Step 4: Handle error cases and validation functions in validator.js

Step 5: Optimize user experience (Include chalk to print output in red for errors)

Step 6: Write test cases for different scenarios

Step 7: Write README
