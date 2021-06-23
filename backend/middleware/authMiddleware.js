import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"; // to add try catch block

const protect = asyncHandler(async (req, res, next) => {
  // 3 arg to middleware always
  let token;
  if (
    // req.headers.autherization --> to get token value as "Bearer TOKEN"
    req.headers.autherization && // if token exisits
    req.headers.autherization.startsWith("Bearer") // and also starts with bearer (just a convention ...)
  ) {
    try {
      token = req.headers.autherization.split(" ")[1]; // split the value to get the token and not the "bearer"

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode the token using secret key

      // decoded includes .. - user id (as we did in generate token part , and some const values as issued time and all ..)

      //console.log(decoded);

      req.user = User.findById(decoded.id).isSelected("-password"); // get the user by using the id we got from the token
      // and allow access to the protected routes..
    } catch (err) {
      console.log(err);
      res.status(401); // 401 - authorization error
      throw new Error("Not authorized, no token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(" Not authorized, no token");
  }
  next(); // used while defining middleware ..
});
export { protect };
