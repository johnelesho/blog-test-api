const jwt = require("jsonwebtoken");
const asyncHandler = require("./async.middleware");
const ResponseError = require("../utils/responseError.utils");
const UserModel = require("../models/User.model");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  console.log(token);
  // Make sure token exists
  if (!token) {
    return next(new ResponseError("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ResponseError("Not authorized to access this route", 401));
  }
});
