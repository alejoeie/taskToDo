const User = require("../models/userModels");
const AppError = require("../utils/AppError")
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, 
      {expiresIn: process.env.JWT_EXPIRES_IN
  });
}
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = { 
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true
  }
  
  // res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
      status: 'success',
      token,
      data: {
          user: user
      }
  });
}

exports.signup = async (req, res, next) => {
  console.log("Ejectuando despues de pre");
  const newUser = await User.create(req.body);

  try {
    createSendToken(newUser, 200, res);
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  
  // 1) Check if email and passwords exist
  try{
      if (!email || !password){
          return next(new AppError('Please provide email and password', 400));
      }
  
      // 2) Check if user exists && password is correct
      const user = await User.findOne({email}).select('+password');
      console.log(user);
      const correct = await user.correctPassword(password, user.password); // Sera true o false
      console.log(password);
      if(!user || !correct){
          return next(new AppError('Incorrect email or password', 401));
      }

      
      // 3) If everything ok, send token to client.
      createSendToken(user, 200, res);
  } catch(err){
      res.status(400).json({
          status: 'fail',
          message: err
      })
  }

};