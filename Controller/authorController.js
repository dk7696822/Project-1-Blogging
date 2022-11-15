const AuthorModel = require("../Models/authorModel");

exports.createAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.create(req.body);
    res.status(201).send(author);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
