const connection = require("../config/connect");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
        const username = data;
        connection.connect(function(err) {
            if (err) {
              console.error('Error executing query:', err);
              return res.status(500).json({ error: 'Failed to authenticate User' });
          }
            connection.query('SELECT * FROM user WHERE  username = ?',[username], function (err, result, fields) {
              if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            return res.json({ status: true, user: result.username })
              
            });
          });


      
    }
  })
}