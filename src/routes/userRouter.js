var express = require('express');
var userRouter = express.Router();
const {  register } = require('../services/userService');
const {  login } = require('../services/authService');

/* GET users listing. */
userRouter.post('/register', (req, res, next) => {
  console.log(req.body)
  register(req.body, (result)=> {
    res.json(result);
  });
});

userRouter.post('/auth', (req, res, next) => {
  if(req.body.password !== '1234'){
    return res.status(404).json({ error: 'Incorrect password/ Email' });
  }

  login(req.body.email, (err,result)=> {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!result) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result);
    });
});



module.exports = userRouter;
