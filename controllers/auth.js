const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnathenticatedError,
} = require("../errors");

//register user
const register = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    throw new BadRequestError("Name or Password cannot be left blank");
  const user = await User.create(req.body);
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({ user: user.name, token });
};

//login user
const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    throw new BadRequestError("Name or Password cannot be left blank");
  const user = await User.findOne({ name });
  if (!user) throw new UnathenticatedError("Invalid Credentials");
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch)
    throw new UnathenticatedError(
      "Incorrect Password , please input correct password"
    );
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({ name: user.name, token });
};

module.exports = { login, register };
