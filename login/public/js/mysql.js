let mysql = require('mysql');
let config = require('./config.js');
 
let connection = mysql.createConnection(config);
 
let sql = `CALL filterTodo(?)`;
 
connection.query(sql, true, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results[0]);
});
 
connection.end();