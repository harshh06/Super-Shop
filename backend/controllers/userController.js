import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @description Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  // to authorize the user
  // get data from body
  const { email, password } = req.body; // destructuring the email & pass. entered by the user in the body ..
  //res.send({ email, password });

  const user = await User.findOne({ email }); // check whether the email exists or not in the db .. using User Model

  if (user && user.matchPassword(password)) {
    // if user exist , then check for the valid password using method defined in userModel.js
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // generate token using jwt and passing user id as payload .. (../utils/generateTokens)
    });
  } else {
    // if not found send 401 response and err message .
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @description Register a new user
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  // get data from body
  const { email, password, name } = req.body; // destructuring the email & pass. entered by the user in the body ..
  //res.send({ email, password });

  const userExists = await User.findOne({ email }); // check whether the email exists or not in the db .. using User Model

  if (userExists) {
    res.status(400); // bad error / request
    throw new Error("User already exists");
  }
  const user = await User.create({
    // create is the method to create user which takes these values ..
    name,
    email,
    password,
  });
  // also middleware added to userModel to bcrypt the password !!
  if (user) {
    res.status(201).json({
      // 201 -- something is created
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @description GET user profile
// @route GET /api/users/profile
// @access Private

// protected route accessed using middleware - authmiddle...
const getUserProfile = asyncHandler(async (req, res) => {
  //res.send("Success");
  const user = await User.findById(req.user._id); // req.user_id --> to get the id of the logged in user

  if (user) {
    // if found the user in db respond wih his data ...
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User Not Found!");
  }
});

export { authUser, getUserProfile, registerUser };
