const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// It is expected that the userLogin code is 16 characters long and that the adminLogin code is 18 characters long. For user codes this is not strictly enforced.
const loginSchema = new Schema({
    loginCode: {
      type: String,
      required: true,
      trim: true,
      minlength: 16
    }
  });
  
  const Login = mongoose.model('Login', loginSchema);
  
  module.exports = Login;