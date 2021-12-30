const router = require('express').Router();
let Login = require('../models/login.model');


router.route('/').get((req, res) => {
    Login.find()
      .then(login => res.json(login))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // this /add route is being used for testing
router.route('/add').post((req, res) => {
  const loginCode = req.body.loginCode;

  const newLogin = new Login({
    loginCode
  });

  newLogin.save()
    .then(() => res.json('Login code added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
  module.exports = router;