/*
 * API routes
 *
 * /api/...
 *
 * This is where you generate a RESTful API
 *
 */

var express = require('express');
var router = express.Router();

var postsModel = '../models/post';
var getPostModel = function() {
    return require(postsModel).Post;
}

/* The posts API */
router.get('/posts', function(req, res, next) {
    var Post = require('../models/post').Post;
    var currentUser = req.user;
    if(typeof currentUser !== 'undefined') {
        Post.findAll({where: {userId: currentUser.id}}).success(function(result) {
            console.log(JSON.stringify(result));
            res.json(result);
        });
    }
});

router.post('/posts', function(req, res, next) {
    var Post = getPostModel();
    var data = {
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id
    };
    Post.create(data).success(function(post) {
        console.log("Successfully created post");
        res.send(200);
    });
});

router.delete('/posts/delete/:id', function(req, res, next) {
    var Post = getPostModel();
    var deleteId = req.params.id;
    var where = { id: deleteId }
    Post.destroy({where:where}).success(function(_) {
	    res.send(200);
    });
});
module.exports = router;
