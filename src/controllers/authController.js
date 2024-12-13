const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

// ฟังก์ชันสำหรับการ login
const loginUser = (req, res) => {
  const { username, password } = req.body;

  userModel.findUserByUsername(username, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send('Username or password is incorrect');
    }

    const user = results[0];
    
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).send('Username or password is incorrect');
      }
      
      res.send('Login successful');
    });
  });
};

// ฟังก์ชันสำหรับการสมัครสมาชิก
const registerUser = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    userModel.createUser(username, hashedPassword, (err, results) => {
      if (err) {
        return res.status(500).send('Error creating user');
      }

      res.send('User registered successfully');
    });
  });
};

module.exports = { loginUser, registerUser };
