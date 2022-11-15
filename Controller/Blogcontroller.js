const blogModel = require('../Models/blogModel');
const { isValidObjectId } = require('../Validation/validation');

const createBlog = async (req, res) => {
    try {
        const reqBody = req.body;
        const { title, body, author_id, Category } = reqBody;

        if (Object.keys(reqBody).length === 0) return res.status(400).send({ status: false, message: 'Please enter data.' });
        if (!title) return res.status(400).send({ status: false, message: 'title is required.' });
        if (!body) return res.status(400).send({ status: false, message: 'body is required.' })
        if (!author_id) return res.status(400).send({ status: false, message: 'authorId is required.' });
        if (!Category) return res.status(400).send({ status: false, message: 'category is required.' });

        if (!isValidObjectId(author_id)) return res.status(400).send({ status: false, message: 'authorId is not valid.' });
        
        const saveData = await blogModel.create(reqBody);
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, error: err.message })
    }
};


const getBlog = async (req, res) => {
    try {
        const data = req.query
        const {author_id,Category,tags,SubCategory} = data
        const saveData = await blogModel.find({ $and: [{isDeleted: false, isPublished: true}, data]});
        if(!saveData){
            return res.status(404).send({ status: false, data:'Blog not found.' })  
        }
        return res.status(200).send({ status: true, message: saveData })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, error: err.message })
    }

};

const updateBlog = async (req, res) => {
    try {
        let data = req.body
        let blogId = req.params.isValidObjectId
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: 'Please enter data.' });
        if (!blogId) return res.status(400).send({ status: false, message: 'blog Id is required.' });
        let findBlogId = await blogModel.findById(blogId),
        if ( findBlogId.isDeleted == true){
            return res.status(400).send({status: true, error: 'Deleted Blog' })
        }
        let update = await blogModel.findOneAndUpdate(
            {_id: blogId },
            {$set: {
                title: "iron man 2",
                body: "Next sequal",
                tags: "updated one",
                SubCategory:"Action"
             }
             
            }
        )
        return res.status(200).send({status: true, msg: updateBlogs})
    } catch (err) {
        res.status(500).send({status: false, msg: err.message})
    }
};

module.exports = {updateBlog}
module.exports =  {createBlog,getBlog}