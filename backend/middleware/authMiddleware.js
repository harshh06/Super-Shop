import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"; // to add try catch block

const protect = asyncHandler(async (req, res, next) => {
  // 3 arg to middleware always
  let token;

  if (
    // req.headers.autherization --> to get token value as "Bearer TOKEN"
    req.headers.authorization && // if token exisits
    req.headers.authorization.startsWith("Bearer") // and also starts with bearer (just a convention ...)
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // split the value to get the token and not the "bearer"

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode the token using secret key

      req.user = await User.findById(decoded.id).select("-password"); // decoded includes .. - user id (as we did in generate token part , and some const values as issued time and all ..)

      //console.log(decoded);

      next(); // used while defining middleware ..
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
