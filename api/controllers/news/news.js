const News = require('../../models/news');
const config = require('../../config/config');

// Get All News
module.exports.getAllNews = (req, res, next) => {
    // Fetch Data from Database and return a Promise
    News.find()
        .select('title imgUrl content _id upvote downvote comments tags category createdAt updatedAt')
        .exec()
        .then(result => {
            // Create and Map new Object From result One By One
            const newsObj = {
                count: result.length,
                news: result.map(data => {
                    return {
                        title: data.title,
                        imgUrl: data.imgUrl,
                        content: data.content,
                        _id: data._id,
                        upvote: data.upvote,
                        downvote: data.downvote,
                        comments: data.comments,
                        tags: data.tags,
                        category: data.category,
                        url: `${config.URL.news}/${data._id}`,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt
                    }
                })
            };
            // Send Req Back with newsObj
            res.status(200).json(newsObj);
        })
        // Catching Errors
        .catch(err => {
            console.log('Error Occured', err);
            res.status(500).json({
                response: {
                    status: 404,
                    message: 'Data Not Found'
                }
            });
        });
}

// Post a New News
module.exports.postANews = (req, res, next) => {
    // Create News Schema from Req Body
    const news = new News({
        title: req.body.title,
        imgUrl: req.body.imgUrl || undefined,
        content: req.body.content,
        category: req.body.category,
        upvote: req.body.upvote || 0,
        downvote: req.body.downvote || 0,
        tags: req.body.tags
    });

    // Save to Database which returns a promise
    news.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                response: {
                    status: 201,
                    news: result
                }
            });
        })
        // Catching Errors
        .catch(err => {
            console.log('Error Occured', err);
            res.status(500).json({
                response: {
                    status: 404,
                    message: 'Insert Failed'
                }
            });
        });
}

// Get an Individual News
module.exports.getANews = (req, res, next) => {
    News.findById({ _id: req.params.newsId })
        .select('title imgUrl content _id upvote downvote comments tags category createdAt updatedAt')
        .exec()
        .then(data => {
            // Send Req Back with newsObj
            res.status(200).json({
                title: data.title,
                imgUrl: data.imgUrl,
                content: data.content,
                _id: data._id,
                upvote: data.upvote,
                downvote: data.downvote,
                comments: data.comments,
                tags: data.tags,
                category: data.category,
                url: `${config.URL.news}/${data._id}`,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            });
        })
        .catch(err => {
            console.log('Error Occured', err);
            res.status(500).json({
                response: {
                    status: 404,
                    message: 'Data Not Found'
                }
            });
        });
}

// Update a News
module.exports.updateNews = (req, res, next) => {
    const _id = req.params.newsId;
    const updateOptions = {};
    for (let ops of req.body) {
        updateOptions[ops.propName] = ops.value;
    }

    // Called Update Method from News Model
    News.update({ _id }, { $set: updateOptions })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'News Updated',
                request: {
                    type: 'GET',
                    url: `${config.URL.news}/${_id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Delete a News
module.exports.deleteNews = (req, res, next) => {
    // Called Remove Method from News Model
    News.remove({ _id: req.params.newsId })
        .exec()
        .then(data => {
            res.status(200).json({
                message: 'News Deleted'
            });
        })
        .catch(err => {
            console.log('Error Occured', err);
            res.status(500).json({
                error: err
            });
        });
}