const bcrypt = require('bcrypt');
const User = require('../../models/users');

// Signup Controller
module.exports.signup = (req, res, next) => {
    const email = req.body.email;

    User.find({ email })
        .exec()
        .then(users => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'Email Already Exists'
                });
            } else {
                // Encryp Password with Bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        // Creating a new User Object
                        const user = new User({
                            username: req.body.username,
                            fullname: req.body.fullname,
                            email: req.body.email,
                            password: hash
                        });

                        // Save User to Database
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'Successfully Signedup',
                                    user: {
                                        _id: result._id,
                                        username: result.username,
                                        fullname: result.name,
                                        email: result.email
                                    }
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    message: 'Signup Failed',
                                    error: err
                                });
                            });
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error Occured',
                error: err
            });
        });
}

// Signin Controller
module.exports.signin = (req, res, next) => {
    // Signin Logic Goes Here
    res.status(200).json({
       message: 'Signin Route Works' 
    });
}

