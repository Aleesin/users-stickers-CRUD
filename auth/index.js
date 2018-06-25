const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../db/user');

//Route paths are prepended with /auth

router.get('/', (req, res) => {
  res.json({
    message: 'lock'
  });
});

function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

  return validEmail && validPassword;
};

function setUserIdCookie(req, res, id) {
  const isSecure = req.app.get('env') != 'development';
  res.cookie('user_id', id, {
    httpOnly: true,
    signed: true,
    secure: isSecure
  });
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        console.log('user', user);
        // if user not found
        if (!user) {
          // this is a unique email
          // has password
          bcrypt.hash(req.body.password, 12)
            .then((hash) => {
              // insert user into db
              const user = {
                email: req.body.email,
                password: hash,
                created_at: new Date()
              };

              User
                .create(user)
                .then(id => {
                  // redirect
                  setUserIdCookie(req, res, id);
                  res.json({
                    id,
                    message: 'USER ADDED'
                  });
                });
            });
        } else {
          // email in use!
          next(new Error('Email in use'));
        }
      });
  } else {
    //send an error
    next(new Error('Invalid user'));
  }
});

router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    // check to see if in DB
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        console.log('user', user);
        if (user) {
          // compare password with hashed password
          bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
              // if the passwords matched
              if (result) {
                // setting the 'set-cookie' header
                setUserIdCookie(req, res, user.id);
                res.json({
                  id: user.id,
                  message: 'Logged in!'
                });
              } else {
                next(new Error('Invalid login'));
              }
            });
        } else {
          next(new Error('Invalid login'));
        }
      });
  } else {
    next(new Error('Invalid login'));
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.json({
    message: 'logged out'
  });
});

module.exports = router;