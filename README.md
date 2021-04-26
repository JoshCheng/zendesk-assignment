# Zendesk Backend Exercise
A CLI application in Node.js which is an automated valet car parking system where you manage a parking space for vehicles as they enter/exit it and manage its revenue.

# Assumptions:
- As this is a CLI application, functions will only print results and not return any values. Also in the case of any error, functions will print human readable text instead of throwing an error for a better user experience.
- Timestamp is assumed to be the 10 digit unix timestamp value which is the number of seconds after 1 Jan 1970, to get the time (in seconds) each vehicle took between entry and exit, we can simply deduct the entry time from exit time.
- Vehicles will not enter the parking space with the same vehicle number until that vehicle has already exited the parking space.
    - In the scenario where the same vehicle number enters before it exits, the parking space will reject the vehicle.
- First line in the input file will always be 2 space delimited numbers.
- Second line onwards will contain two types of events:
    - Vehicle entering the space: ​```Enter <motorcycle|car> <vehicle number> <timestamp>```​. The program should print out either ​accept or ​reject based on the availability of lots in the parking space. If the vehicle is accepted, the program also returns the name of the lot being occupied by it.
    - Vehicle exiting the space: ​```Exit <vehicle number> <timestamp>​```. The program prints out the released lot and the parking fee.
- Exit time of vehicle should not be earlier than the entry time
- The vehicle number upon exit should be valid. It should exist within the existing vehicle parking lot.
- The same vehicle (with the same vehicle number) should not enter the parking space before exiting.
- If the data line format is not valid, the vehicle will be ignored and an error message will be printed in red.
- Only .txt files are valid.

# How to run it:
```
$ git clone https://github.com/JoshCheng/zendesk-assignment.git
$ cd zendesk-assignment
$ npm install
$ node main demo.txt
```

Note: the fileName value in ```node main <fileName>``` will contain the file extension and the application will read the file from the ./inputFiles directory.

# Package dependencies:
- chalk - For colour of text for user experience

# Folder structure:
```
|-- inputFiles
| |-- ...txt input files
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
- Functions file would contain carpark functions.
- Validation file would contain validation functions.
- Output would be saved in output.txt.

# Files in inputFiles
- demo.txt -> input file as per given in backend exercise pdf
- test.js -> invalid file format
- test1.txt -> invalid line format for each segment e.g. enter1 car2 SGX1234A12 111abc
- test2.txt -> vehicle lot is full, for both car and motorcycle and also if the vehicle states to exit but does not exist in the parking system
- test3.txt -> invalid parking lots present. e.g. a b

# Approach Taken:
Step 1: Read and understand requirements of Automated Valet Car Parking System and state assumptions when necessary

Step 2: Set up file and code structure of CLI application in an extensible manner

Step 3: Write up main executable code for main.js

Step 4: Write up enter and exit carpark functions in carpark.js

Step 4: Handle error cases and validation functions in validator.js

Step 5: Optimize user experience

Step 6: Write README
