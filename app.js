const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");




const employeeList = [];

function writeFileTo(){
    let html = render(employeeList);
    fs.writeFile(outputPath, html, "utf-8", (err) => {
        if (err) throw err;
        console.log("HTML has been generated")
    })}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptUser() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "Enter Role",
                choices: ["Intern", "Engineer", "Manager"]
            },
            {
                type: "input",
                name: "name",
                message: "Enter Name"
            },
            {
                type: "input",
                name: "id",
                message: "Enter ID"
            },
            {
                type: "input",
                name: "email",
                message: "Enter Email"
            },
            {
                type: "input",
                name: "office",
                message: "Enter Office Number",
                when: function (employee) {
                    return employee.role === "Manager"
                }
            },
            {
                type: "input",
                name: "github",
                message: "Enter GitHub",
                when: function (employee) {
                    return employee.role === "Engineer"
                }
            },
            {
                type: "input",
                name: "school",
                message: "Enter School",
                when: function (employee) {
                    return employee.role === "Intern"
                }
            },
            {
                type: 'confirm',
                name: 'askAgain',
                message: 'Enter another employee? (just hit enter for YES)?',
                default: true,
            }
        ])
        .then(async employee => {
            if (employee.role === "Manager"){
            employeeList.push(new Manager(employee));}
            else if (employee.role === 'Engineer'){
                employeeList.push(new Engineer(employee))
            }
            else if (employee.role === "Intern"){
                employeeList.push(new Intern(employee))
            }
            if (employee.askAgain) {
                promptUser();
            } else {
                writeFileTo();
            };
            
        })
}
promptUser();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
