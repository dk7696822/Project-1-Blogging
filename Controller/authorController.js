const authorModel = require('../Models/authorModel');
const { isValidEmail, isValidPass } = require('../Validation/validation');


const createAuthor = async (req, res) => {
    try {
        const reqBody = req.body;
        const { FirstName, LastName, title, email, Password } = reqBody;

        if (Object.keys(reqBody).length === 0) return res.status(400).send({ status: false, message: 'Please enter data.' });
        if (!FirstName) return res.status(400).send({ status: false, message: 'fname is required.' });
        if (!LastName) return res.status(400).send({ status: false, message: 'lname is required.' })
        if (!title) return res.status(400).send({ status: false, message: 'title is required.' });
        if (!email) return res.status(400).send({ status: false, message: 'email is required.' });
        if (!Password) return res.status(400).send({ status: false, message: 'password is required.' });

        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: 'email is not valid.' });
        if (!isValidPass(Password)) return res.status(400).send({ status: false, message: 'Password should be 8-15 char & use 0-9,A-Z,a-z & special char this combination.' });

        const saveData = await authorModel.create(reqBody);
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, error: err.message })
    }
};

module.exports = { createAuthor }