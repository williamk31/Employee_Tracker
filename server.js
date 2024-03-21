
const { Pool } = require('pg');
const startProgram = require('./inquire.js')

// const pool = new Pool(
//     {
//         user: 'postgres',
//         password: 'will',
//         host: 'localhost',
//         database: 'employee_db'
//     },
//     console.log('Connected to the employee_db database!')
// )

// pool.connect();
startProgram();
