import jwt from "jsonwebtoken";

const generateToken = (id) => {
  // signed with user id and secret key kept in .env file
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
