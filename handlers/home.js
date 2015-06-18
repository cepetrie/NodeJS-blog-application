var db = require("../db");

module.exports = function (req, reply) {
    db.getAllPosts(function (err, posts) {
        posts.forEach(function (post) {
            post.truncated = post.content.substr(0, 300);
        });
        reply.view("index", {
            posts: posts,
            title: "Home"
        });
    })
};