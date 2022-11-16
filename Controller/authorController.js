const AuthorModel = require("../Models/authorModel");
const jwt = require("jsonWebToken")
exports.createAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.create(req.body);
    res.status(201).send(author);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.loginAuthor = async(req,res)=>{
  const findAuthor = await AuthorModel.findOne({email:req.body.emailId, password:req.body.password})
  if(!findAuthor){
    res.status(400).send('Émail or Password is incorrect')
  }
  const token = jwt.sign({authorId:findAuthor._id}, 'my-cool-password')
  res.status(200).send(token)
}

exports.getAllAuthors = async(req,res)=>{
  const author = await AuthorModel.find()
  res.send(author)
}

exports.author = async(req,res)=>{
if(req.params.id===req.authorId){
  const author = await AuthorModel.findById(req.params.id)
  res.send(author)
}else{
  res.send('Ýou are not authorised')
}
}