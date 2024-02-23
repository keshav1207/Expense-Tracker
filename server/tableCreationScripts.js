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

  // Execute code to create  category table

  connection.query(createExpenseCategoryQuery,(err,results)=>{
    if(err) throw err;
    console.log(results);
  });


  //Add code to populate the expenseCategory table
  const populateExpenseCategories = `
  INSERT INTO expenseCategory 
  VALUES
  ('Rent','red'),
  ('Eating-out','blue'),
  ('Transport','yellow'),
  ('Utilities','green'),
  ('Mobile-Phone','orange'),
  ('Groceries','purple'),
  ('Fitness','indigo'),
  ('Shopping','pink')

  `



   // Execute code to populate table

  connection.query(populateExpenseCategories,(err,results)=>{
    if(err) throw err;
    console.log(results);
  });

    //Add code to create  expenseTransaction table
    const createExpenseTransactionQuery = `CREATE TABLE expenseTransaction(
      name VARCHAR(30),
      amount DECIMAL(10, 2),
      category   INT,
      date  DATE,
      
      FOREIGN KEY(category)  REFERENCES  expenseCategory(id)
    )`;


     // Execute code to create transaction table

  connection.query(createExpenseTransactionQuery,(err,results)=>{
    if(err) throw err;
    console.log(results);
  });



  //End connection

  connection.end((err) => {
  if (err) {
    console.error('Error closing database connection: ' + err.stack);
    return;
  }
  console.log('Database connection closed.');
});