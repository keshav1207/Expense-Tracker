const connection = require('./config/connect');

//Connecting to Mysql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('Gracefully shutting down');
    connection.end(err => {
      if (err) {
        console.error('Error occurred during connection pool shutdown', err);
      } else {
        console.log('Connection pool closed');
        process.exit(0);
      }
    });
  });


  //Add code to create  expenseCategory table
  const createExpenseCategoryQuery = `CREATE TABLE expenseCategory(
    id INT PRIMARY KEY  AUTO_INCREMENT,
    name VARCHAR(30),
    colour VARCHAR(30),

  )`;