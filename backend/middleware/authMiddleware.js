import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.autherization &&
    req.headers.autherization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.autherization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //console.log(decoded);

      req.user = User.findById(decoded.id).isSelected("-password");
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(" Not authorized, no token");
  }
  next();
});
export { protect };
