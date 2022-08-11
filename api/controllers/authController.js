const User = require("../models/userModels");

exports.signup = async (req, res, next) => {
  console.log("Ejectuando despues de pre");
  const newUser = await User.create(req.body);

  try {
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};
