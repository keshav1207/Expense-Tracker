const connection = require ('../config/connect');

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


//Get Category name
function getCategory(req,res){
    const {name} = req.body;

     // Validate input
 if (!name) {
  return res.status(400).json({ error: 'Name required' });
}
    connection.connect(function(err) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      connection.query('SELECT * FROM expenseCategory WHERE name = ?',[name], function (err, result, fields) {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
        console.log(result);
        res.send(result);
      });
    });
}


// Create a new category
function createCategory(req,res){
  const {name, colour} = req.body;

 // Validate input
 if (!name || !colour) {
  return res.status(400).json({ error: 'Name and colour are required' });
}

  connection.connect(function(err) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
    connection.query('INSERT INTO expenseCategory (name, colour) VALUES (?, ?)',[name, colour], function (err, result, fields) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      console.log(result);
      res.send(result);
    });
  });

}

//Delete a category
function deleteCategory(req,res){
  const {name} = req.body;
  // Validate input
  if (!name) {
  return res.status(400).json({ error: 'Name required' });
  }
    connection.connect(function(err) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      connection.query('DELETE FROM expenseCategory WHERE name = ?',[name], function (err, result, fields) {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
        console.log(result);
        res.send(result);
      });
    });

}


function createTransaction(req,res){
    

}


function getTransaction(req,res){
    

}



function deleteTransaction(req,res){
    

}



module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    getTransaction,
    createTransaction,
    deleteTransaction

}