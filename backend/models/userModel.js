import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Match Password while logging in

// matchPassword is th name gien by us
// method to compare the password entered by the user to the "hashed password in db"
// using bcrypt.compare --> inbuilt function to match data
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // this.password -> password in the db
};

// Hash password while creating new user

// to encrypt the password when registering the new user through registerUser route
// pre used as this is to happen pre save ..
userSchema.pre("save", async function (next) {
  // is we update something like name or email and email, we have to check
  // whether its modified or not ...
  if (!this.isModified("password")) {
    next();
  }
  // need salt to hash password asyncronously ..
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
