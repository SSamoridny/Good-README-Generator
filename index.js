// Dependencies 
const inquirer = require ('inquirer');
const fs = require ('fs');
const path = require('path');

// User questions
function promptUser() {
 return inquirer.prompt([
            {
            name: "project_title",
            type: "input",
            message: "What is your project called?",
        } ,
        {
            name:"project_description",
            type: "input",
            message: "Write a brief description of the project."
        },
        {
            name:"installation_instructions",
            type: "input",
            message: "How do you install your project?"
        },
        {
            name: "usage_instructions",
            type: "input",
            message: "Please tell me how to use the product.",
        },
        {
            name: "project_credits",
            type: "input" ,
            message: "Please list collaborators for the project and their contributions."

        },
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "username",
        },
        {
            type: "input",
            message: "Enter your email address?",
            name: "email",
        },
        {
            name: "project_license",
            type: "checkbox",
            message: "Please select one license for this project",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPL v3"
            ]
        },
       

    ]);
}

// Function to run the license
function getLicense(license){
    
     if (license[0] === "Apache"){
         return fs.readFileSync(path.resolve(__dirname, './Licenses/apache.txt'), { encoding: 'utf-8'})
     }
     else if (license[0] === "MIT"){
         return fs.readFileSync(path.resolve(__dirname, './Licenses/mit.txt'), { encoding: 'utf-8'})
     }
     else if (license[0] === "ISC"){
         return fs.readFileSync(path.resolve(__dirname, './Licenses/isc.txt'), { encoding: 'utf-8'})
     }
     else if (license[0] === "GNU GPL v3"){
         return fs.readFileSync(path.resolve(__dirname, './Licenses/gnu.txt'), { encoding: 'utf-8'})
     }
    console.log(license)
}


// This part actually takes the responses and creates our README file using backtick notation and some clever spacing

function generateReadme(response){

        return`

# ${response.project_title}
![](https://img.shields.io/badge/README-GOODREADME-brightgreen)

## Table of Contents
- [Description](#project_description)
- [Installastion](#installation_instructions)
- [Usage](#usage_instructions)
- [Credits](#project_credits)
- [License](#project_license)
- [Questions](#questions)

## Description: 

         ${response.project_description}

## Installation:

         ${response.installation_instructions}

## Usage:

         ${response.usage_instructions}

## Credits:

        ${response.project_credits}

## GitHUb Adress:

        ${response.username}

## Email Address:

        ${response.email}

## License:
    

    
    ${getLicense(response.project_license)}
      

   
`;
}
// After taking in the information, this is the function that creates our README by generating a README.md file and wriring the answers given to that file
  function generate(){
      promptUser()
      .then(function(response) {
          let readMe = generateReadme(response);
          fs.writeFileSync("README.md" , readMe)
      })
      .catch(function(err){
          console.log("---Error---" , err)

      })
  }
// this calls the function
generate();