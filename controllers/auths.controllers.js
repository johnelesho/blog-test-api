const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const ResponseError = require("../utils/responseError.utils");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.registerUser = async (req, res, next) => {
  // const { username, email, password, displayPicture } = req.body;
  try {
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(reqPassword, salt);
    // const newUser = new UserModel();

    const user = await UserModel.create(req.body);

    // const user = await newUser.save();
    // const { password, ...others } = newUser._doc;

    // const token = user.getSignedJwtToken();

    // res.status(201).json({
    //   message: "Successfully registered a new user",
    //   success: true,
    //   data: user,
    //   token,
    // });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  //Validate Login credentials
  if (!username || !password) {
    return next(
      new ResponseError("Please Provide a username and Password", 400)
    );
  }
  try {
    const user = await UserModel.findOne({ username }).select("+password");
    console.log(user);
    if (!user) return next(new ResponseError("Invalid Credentials", 400));

    // const checkPassword = await bcrypt.compare(password, user.password);
    // console.log(checkPassword);
    // const { password, ...others } = user._doc;
    // console.log("Without the password", others);
    // const token = user.getSignedJwtToken();

    const isPasswordMatch = await user.matchPassword(password);
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return next(new ResponseError("Invalid Credentials", 400));
    }

    sendTokenResponse(user, 200, res);
    // res.status(200).json({
    //   message: "Login successful",
    //   success: true,
    //   data: user,
    //   token,
    // });
  } catch (err) {
    next(err);
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    data: user,
    token,
  });
};
