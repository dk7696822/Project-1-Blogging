const jwt = require("jsonwebtoken");
const AuthorModel = require("../Models/authorModel");
const BlogModel = require("../Models/blogModel");

// exports.loginAuthor = async (req, res, next) => {
//   try {
//     const findAuthor = await AuthorModel.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     if (!findAuthor) {
//       return res.status(400).send("Émail or Password is incorrect");
//     }
//     const token = jwt.sign({ authorId: findAuthor._id }, "my-cool-password");
//     req.headers["x-api-key"] = token;
//     next();
//   } catch (err) {
//     return res.send(err.message);
//   }
// };

exports.authentication = async function (req, res, next) {
  try {
    // check token
    let token = req.headers["x-api-key"];
    // if(!token) req.headers["x-api-key"];
    if (!token)
      return res
        .status(401)
        .send({ status: false, msg: "You are not logged in" });

    // verify token
    let decodedToken = jwt.verify(token, "my-cool-password");
    console.log(decodedToken);
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
    console.log(req.authorId, blog.author_id);
    if (req.authorId != blog.author_id) {
      return res.status(400).send("You are not authorized");
    }
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
