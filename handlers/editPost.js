var Post = require("../models/post");

module.exports = function (req, reply) {
  //load from database
    var post = new Post({
        slug: req.params.slug
    });
    post.load(function () {
        reply.view("post", {
            title: "Edit Post",
            post: post.toJSON()
        })
    })
};