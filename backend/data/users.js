import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Levi ",
    email: "akerman.levi@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "eren",
    email: "jayeger.erenn@example.com",
    password: bcrypt.hashSync("12346", 10),
  },
];

export default users;
