const jwt = require("jsonwebtoken");
const { UnathenticatedError } = require("../errors");
const authentication = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnathenticatedError("Authentication failed , please try again");
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach user to chat routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnathenticatedError("Authentication failed");
  }
};

module.exports = authentication;
