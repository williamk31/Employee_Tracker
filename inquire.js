const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'will',
        host: 'localhost',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database!')
);

pool.connect();

const question = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'
        ],
        name: 'options'
    },
]

function response(data) {
    console.log(data.options)
    switch (data.options) {
        case 'View all departments':
           viewAllDepartments();
           break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployeeRole();
            break;
        case 'Quit':
            return;
    }
}

function startProgram() {
    inquirer
        .prompt(question)
        .then(response)
}

function viewAllDepartments() {
    console.log('in the function')
    const sql = `SELECT id, name AS department FROM department`
    pool.query(sql, (err, { rows }) => {
        if (err) {
            console.log(err);
          }
          console.table(rows);
    })
}

function viewAllRoles() {
    const sql = `SELECT * FROM role`
    pool.query(sql, (err, { rows }) => {
        if (err) {
            console.log(err);
          }
          console.table(rows);
    })
}

function viewAllEmployees() {
    const sql = `SELECT * FROM employee`
    pool.query(sql, (err, { rows }) => {
        if (err) {
            console.log(err);
          }
          console.table(rows);
    })
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        message: 'Department Name',
        name: 'department'
    })
        .then(function(data){ 
            console.log(data.department)
            const sql = `INSERT INTO department (name) VALUES ($1)`
            let departmentName = data.department
            pool.query(sql, [departmentName], (err, result) => {
                if (err) {
            console.log(err);
            }
          console.log(`${data.department} succesfully added to Departments`);
            })
        })

}
    
function addRole() {
    let departmentSql = `SELECT id, name FROM department`;
    pool.query(departmentSql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        let departments = result.rows;
        let departmentsArray = departments.map(department => department.name)
    inquirer.prompt([
        {
            type: 'input',
            message: 'Role Name',
            name: 'role'
        },
        {
            type: 'input',
            message: 'Salary',
            name: 'salary'
        },
        {
            type: 'list',
            choices: departmentsArray,
            message: 'What department does this role belong to?',
            name: 'chosenDepartment'
        }
    ])
        .then(function(data){ 
            let selectedDepartment = departments.find(department => data.chosenDepartment === department.name)
    
            const sql = `INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)`
            let roleName = data.role
            let roleSalary = data.salary
            pool.query(sql, [roleName, roleSalary, selectedDepartment.id], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                 }
          console.log(`${data.role} succesfully added to Roles!`);
            })
        })
    })

}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Employee First Name',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Employee Last Name',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Role ID',
            name: 'roleID'
        },
        {
            type: 'input',
            message: 'Manager ID',
            name: 'managerID'
        }
    ])
        .then(function(data){ 
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`
            let firstName = data.firstName;
            let lastName = data.lastName;
            let roleID = data.roleID;
            let managerID = data.managerID;
            pool.query(sql, [firstName, lastName, roleID, managerID], (err, result) => {
                if (err) {
            console.log(err);
            }
          console.log(`${firstName} ${lastName} succesfully added to Employees`);
            })
        })

}

function updateEmployeeRole() {
    let employeeSql = `SELECT id, first_name, last_name FROM employee`;
    pool.query(employeeSql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } 
        console.log(result);
        let employees = result.rows;
        console.log(employees);
        let employeeNames = employees.map(employee => `${employee.first_name} ${employee.last_name}`);

        let roleSql = `SELECT id, title FROM role`;
        pool.query(roleSql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        let roles = result.rows;
        let rolesArray = roles.map(role => role.title);
   
    inquirer.prompt([
        {
            type: 'list',
            choices: employeeNames,
            name: 'employees',
            message: 'Choose an employee to update:'
        },
        {
            type: 'list',
            choices: rolesArray,
            name: 'roles',
            message: 'What is their new role?'
        }
    ])
        .then(function(data){
            
            let newRoleID;
            roles.forEach((role) => {
                if(data.roles === role.title){
                    newRoleID = role.id
                }
            })
            let employeeID;
            employees.forEach((employee) => {
                if(data.employees === `${employee.first_name} ${employee.last_name}`){
                    employeeID = employee.id
                }
            })
            const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
            pool.query(sql, [newRoleID, employeeID], (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Employee's role updated succesfully!`)
            });
        })
    });
    });
}


module.exports = startProgram;