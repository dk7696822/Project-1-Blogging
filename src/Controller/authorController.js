const AuthorModel = require("../Models/authorModel");
const jwt = require("jsonWebToken");
exports.createAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.create(req.body);
    res.status(201).send(author);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.loginAuthor = async (req, res) => {
  try {
    const findAuthor = await AuthorModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!findAuthor) {
      res.status(400).send("Émail or Password is incorrect");
    }
    const token = jwt.sign({ authorId: findAuthor._id }, "my-cool-password");
    res.status(200).send(token);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
