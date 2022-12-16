const notFound = (req, res) => {
  return res.status(404).send("<h1>Route doesn't exist</h1>");
};
module.exports = notFound;
