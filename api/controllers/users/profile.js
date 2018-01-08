const User = require('../../models/users');

// Get Profile Controller
module.exports.profile = (req, res, next) => {
    // Getting Profile Logic Goes Here
    res.status(200).json({
        message: 'Getting Profile Route Works'
    });
}

// Get All User Controller
module.exports.getAllUser = (req, res, next) => {
    User.find()
        .select('_id fullname username email createdAt updatedAt')
        .exec()
        .then(result => {
            const allUsers = {
                count: result.length,
                users: result.map(user => {
                    return {
                        _id: user._id,
                        fullname: user.fullname,
                        username: user.username,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                })
            }
            res.status(200).json(allUsers);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Update User Controller
module.exports.updateUser = (req, res, next) => {
    // Update User Profile Logic Goes Here
    res.status(200).json({
        message: 'Updating Profile Route Works'
    });
}

// Remove User Controller
module.exports.removeUser = (req, res, next) => {
    // Remove User Logic Goes Here
    res.status(200).json({
        message: 'Deleting User Route Works'
    });
}