const News = require('../../models/news');

// Give a Upvote
module.exports.upvote = (req, res, next) => {
    const _id = req.params.newsId;

    News.findById({ _id })
        .select('upvote')
        .exec()
        .then(result => {
            var vote = {
                upvote: result.upvote + 1
            }
            return News.update({ _id }, { $set: vote }).exec()
        })
        .then(data => {
            res.status(200).json({
                message: 'Upvoted Successfully',
                status: 200,
                response: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Give a Downvote
module.exports.downvote = (req, res, next) => {
    const _id = req.params.newsId;

    News.findById({ _id })
        .select('downvote')
        .exec()
        .then(result => {
            var vote = {
                downvote: result.downvote + 1
            }
            return News.update({ _id }, { $set: vote }).exec()
        })
        .then(data => {
            res.status(200).json({
                message: 'Downvoted Successfully',
                status: 200,
                response: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}