const connection = require ('../config/connect');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const userVerification = require("../middleware/auth");


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
  const user = req.params.user; 
  connection.connect(function(err) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
    connection.query('SELECT expenseTransaction.*, expenseCategory.name AS Category_Name FROM expenseTransaction JOIN expenseCategory ON expenseTransaction.category = expenseCategory.id WHERE expenseTransaction.user = ?', [user],function (err, result, fields) {
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
  const user = req.params.userId;
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
     connection.query('INSERT INTO expenseTransaction (name, amount, category, date, user) VALUES (?, ?, ?, ?,?)',[name, amount, category, date, user], function (err, result, fields) {
       if (err) {
         console.error('Error executing query:', err);
         return res.status(500).json({ error: 'Internal server error' });
     }
       console.log(result);
       res.send(result);
     });
   }); 

}

module.exports.createTransaction = [userVerification,createTransaction];

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

module.exports.deleteTransaction = [userVerification,deleteTransaction];

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

module.exports.updateTransaction = [userVerification,updateTransaction];


//------------------User Controllers---------------------------//


// Register User
async function registerUser(req,res){
  const saltRounds = 12;
  const {userName, email, password} = req.body;

  // Validate input
  if (!userName || !email|| !password) {
   return res.status(400).json({ error: 'Name, email and password are required' });
 }

 //Hash password
    
 const hashedPassword  = await bcrypt.hash(password, saltRounds)


 
   connection.connect(function(err) {
     if (err) {
       console.error('Error executing query:', err);
       return res.status(500).json({ error: 'Internal server error' });
   }


    //Verify that email used is unique
    connection.query('SELECT * FROM user WHERE email = ?',[email], function (err, result, fields) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length > 0) {
      return res.status(500).json({ error: 'Email already being used!' });
    }

    
    connection.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)',[userName, email, hashedPassword], function (err, result, fields) {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
      console.log(result);

      //Creating Token
      const token = jwt.sign({
        userName
      }, process.env.JWT_SECRET, { expiresIn: '1d' });


      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });


      return res.status(200).json({ message: 'User created successfully!' });
    });
  
    });


     
   });
}

// Login User

async function loginUser(req,res){
  const { email, password} = req.body;

  // Validate input
  if ( !email|| !password) {
   return res.status(400).json({ error: 'Email and password are required' });
 }

 //Getting hashed password and username from database
 connection.connect(function(err) {
  if (err) {
    console.error('Error executing query:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  connection.query('SELECT password, username , user_id FROM user WHERE email = ? ',[email], function (err, results, fields) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }

    // Check if no user found with the provided email
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

  const userName = results[0].username;
  const hashedPassword = results[0].password;
  const userId = results[0].user_id;

    

    //Verified password
    bcrypt.compare(password, hashedPassword, function(err, result) {
       if(result){
        //Creating Token
        const token = jwt.sign({
          userName
        }, process.env.JWT_SECRET, { expiresIn: '1d' });


        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });


      return res.status(200).json({ message: 'User Logged In successfully!' , userId:userId});
      
     }

     return res.status(404).json({ error: 'Password is incorrect' });

    });
  })
 })

}


//Log out User
function logOutUser(req,res){
  res.clearCookie('token');
  return res.status(200).json({ message: 'User Logged out successfully!' });
}

//Get all registered users
 function  getAllUsers(req,res){
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
    updateUser,
    loginUser,
    logOutUser

}
