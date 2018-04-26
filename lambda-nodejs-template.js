var mysql = require('mysql');

exports.handler = function(event, context, callback) {
  // console.log(event);
  var payload = JSON.parse(event.body);
  
  var connection = mysql.createConnection({
    host     : '[rds_host]',
    user     : '[rds_user]',
    password : '[rds_password]',
    database : '[rds_database]'
  });
  
  connection.query("INSERT INTO items (field, field2, field3) VALUES (1, 2, 3)");
  
  callback(null, event);
};
