const jwt = require("jsonwebtoken");
const BlogModel = require("../Models/blogModel");

exports.authentication = async function (req, res, next) {
  try {
    // check token
    let token = req.headers["x-api-key"];
    if (!token)
      return res
        .status(401)
        .send({ status: false, msg: "You are not logged in" });

    // verify token
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken)
      return res
        .status(403)
        .send({ status: false, msg: "You are not authorised" });
    req.authorId = decodedToken.authorId;

    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

exports.authorisation = async (req, res, next) => {
  try {
    const blog = await BlogModel.findOne({
      _id: req.params.blogId,
      isDeleted: false,
    });
    if (!blog) {
      return res.status(400).send("No such blog found");
    }
    if (req.authorId != blog.author_id) {
      return res.status(400).send("You are not authorized");
    }
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
