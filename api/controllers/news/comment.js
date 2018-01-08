const News = require('../../models/news');
const User = require('../../models/users');
const config = require('../../config/config');

// Put a Comment
module.exports.putComment = (req, res, next) => {
    const _id = req.params.newsId;

    const commentObj = {
        comment: req.body.comment,
        userId: req.body.userId
    }

    News.update({ _id },
        { $push: { 'comments': commentObj } },
        { safe: true, upsert: true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Comment Added Successfully',
                status: 200,
                response: result,
                newsUrl: `${config.URL.news}/${_id}`
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Get All Comment
module.exports.getAllComment = (req, res, next) => {
    News.findById({ _id: req.params.newsId })
        .populate('comments.userId', 'username email fullname')
        .exec()
        .then(result => {
            console.log(result.comments);
            res.status(200).json({
                count: result.comments.length,
                comments: result.comments,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

}

// Update a Comment
module.exports.updateAComment = (req, res, next) => {
    News.update({ 'comments._id': req.params.commentId },
        {
            $set: {
                'comments.$.comment': req.body.updatedComment
            }
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Comment Updated Successfully',
                response: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Delete a Comment
module.exports.deleteAComment = (req, res, next) => {
    const newsId = req.params.newsId;
    const commentId = req.params.commentId;

    News.findByIdAndUpdate(newsId,
        { $pull: { 'comments': { '_id': commentId } } })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Comment Deleted Successfully',
                status: 200
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}