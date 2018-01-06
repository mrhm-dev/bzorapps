const express = require('express');
const router = express.Router();
const News = require('../models/news');

// Get Method for News /api/news
router.get('/', (req, res, next) => {
    // Fetch Data from Database and return a Promise
    News.find()
        .select('title imgUrl content _id')
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
                      _id: data._id
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
});

// Post Method for news /api/news
router.post('/', (req, res, next) => {
    // Create News Schema from Req Body
    const news = new News({
        title: req.body.title,
        imgUrl: req.body.imgUrl || undefined,
        content: req.body.content
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


});

// Get Method for Individual News /api/news/newsId
router.get('/:newsId', (req, res, next) => {
    res.status(200).json({
        response: {
            status: 200,
            message: 'Individual News Get Method Works'
        }
    })
});

// Update Method for News /api/news/newsId
router.put('/:newsId', (req, res, next) => {
    res.status(200).json({
        response: {
            status: 200,
            message: 'News Put Method Works'
        }
    })
});

// Delete Method for News /api/news/newsId
router.delete('/:newsId', (req, res, next) => {
    res.status(200).json({
        response: {
            status: 200,
            message: 'News Delete Method Works'
        }
    })
});

module.exports = router;