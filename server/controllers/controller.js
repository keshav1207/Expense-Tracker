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



//------------------Categories Controllers---------------------------//

//Get all Categories 
function getAllCategories(req,res){
  
  connection.connect(function(err) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
    connection.query('SELECT * FROM expenseCategory',function (err, result, fields) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      console.log(result);
      res.send(result);
    });
  });
}


//Get a  specific Category 
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

//------------------Transaction Controllers---------------------------//

//Get all transactions
function getAllTransactions(req,res){

  connection.connect(function(err) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
    connection.query('SELECT expenseTransaction.*, expenseCategory.name AS Category_Name FROM expenseTransaction JOIN expenseCategory ON expenseTransaction.category = expenseCategory.id; ', function (err, result, fields) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      console.log(result);
      res.send(result);
    });
  });

}


// Create  a new transaction
function createTransaction(req,res){
  const {name, amount, category, date} = req.body;

  // Validate input
  if (!name || !amount||!category|!date){
   return res.status(400).json({ error: 'Name, Amount, Date and Category are required' });
 }
 
   connection.connect(function(err) {
     if (err) {
       console.error('Error executing query:', err);
       return res.status(500).json({ error: 'Internal server error' });
   }
     connection.query('INSERT INTO expenseTransaction (name, amount, category, date) VALUES (?, ?, ?, ?)',[name, amount, category, date], function (err, result, fields) {
       if (err) {
         console.error('Error executing query:', err);
         return res.status(500).json({ error: 'Internal server error' });
     }
       console.log(result);
       res.send(result);
     });
   }); 

}

// Get a  specific transaction
function getTransaction(req,res){
  const transactionId = req.params.transactionId;

     // Validate input
  if (!transactionId) {
    return res.status(400).json({ error: 'Transaction Id required' });
    }

    connection.connect(function(err) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      connection.query('SELECT * FROM expenseTransaction  WHERE id = ?',[transactionId], function (err, result, fields) {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
        console.log(result);
        res.send(result);
      });
    });

}

// Delete a transaction

function deleteTransaction(req,res){

  const transactionId = req.params.transactionId;

     // Validate input
  if (!transactionId) {
    return res.status(400).json({ error: 'Transaction Id required' });
    }

    connection.connect(function(err) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      connection.query('DELETE FROM expenseTransaction  WHERE id = ?',[transactionId], function (err, result, fields) {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
        console.log(result);
        res.send(result);
      });
    });

    

}

// Update a transaction
function updateTransaction(req,res){

  const transactionId = req.params.transactionId;
  const updates = req.body;

     // Validate input
  if (!transactionId) {
    return res.status(400).json({ error: 'Transaction Id required' });
    }

    let updateQuery = `UPDATE expenseTransaction SET `
    let updateValues = [];

   

  // The following isLast variable is used so that we don't add a comma after the last column we want to update
    let isLast = true;
    Object.keys(updates).forEach((key) => {
      if (updates[key]) {
        if(!isLast){
          updateQuery += `,`
        }
        updateQuery += `${key} = ?`;
        updateValues.push(updates[key]);
        isLast = false;

      }
    });

    updateQuery += ` WHERE id = ?`
    updateValues.push(transactionId);

    console.log(updateQuery,updateValues);


    connection.connect(function(err) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      connection.query(updateQuery,updateValues, function (err, result, fields) {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
        console.log(result);
        res.send(result);
      });
    });

}


//------------------User Controllers---------------------------//


// Register User
function registerUser(req,res){

  const {userName, email, password} = req.body;

  // Validate input
  if (!userName || !email|| !password) {
   return res.status(400).json({ error: 'Name, email and password are required' });
 }
 
   connection.connect(function(err) {
     if (err) {
       console.error('Error executing query:', err);
       return res.status(500).json({ error: 'Internal server error' });
   }
     connection.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)',[userName, email, password], function (err, result, fields) {
       if (err) {
         console.error('Error executing query:', err);
         return res.status(500).json({ error: 'Internal server error' });
     }
       console.log(result);
       res.send(result);
     });
   });
}

//Get all registered users
function getAllUsers(req,res){
  connection.connect(function(err) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
    connection.query('SELECT * FROM user',function (err, result, fields) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      console.log(result);
      res.send(result);
    });
  });

}


//Get a specific user
function getUser(req,res){
  const userId = req.params.userId;

   // Validate input
if (!userId) {
return res.status(400).json({ error: 'UserId required' });
}
  connection.connect(function(err) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
    connection.query('SELECT * FROM user WHERE  user_id = ?',[userId], function (err, result, fields) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      console.log(result);
      res.send(result);
    });
  });
}

//Delete a user
function deleteUser(req,res){
  const userId = req.params.userId;

   // Validate input
if (!userId) {
return res.status(400).json({ error: 'UserId required' });
}
  connection.connect(function(err) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
    connection.query('DELETE FROM user WHERE  user_id = ?',[userId], function (err, result, fields) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      console.log(result);
      res.send(result);
    });
  });
}

// Update a User
function updateUser(req,res){

  const userId = req.params.userId;
  const updates = req.body;

     // Validate input
  if (!userId) {
    return res.status(400).json({ error: 'User Id required' });
    }

    let updateQuery = `UPDATE user SET `
    let updateValues = [];

   

  // The following isLast variable is used so that we don't add a comma after the last column we want to update
    let isLast = true;
    Object.keys(updates).forEach((key) => {
      if (updates[key]) {
        if(!isLast){
          updateQuery += `,`
        }
        updateQuery += `${key} = ?`;
        updateValues.push(updates[key]);
        isLast = false;

      }
    });

    updateQuery += ` WHERE user_id = ?`
    updateValues.push(userId);

    console.log(updateQuery,updateValues);


    connection.connect(function(err) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      connection.query(updateQuery,updateValues, function (err, result, fields) {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
        console.log(result);
        res.send(result);
      });
    });

}






module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    getAllCategories,
    getAllTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction,
    registerUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser

}
