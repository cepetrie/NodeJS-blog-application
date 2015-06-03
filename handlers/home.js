var db = require("../db");

module.exports = function(req, reply) {
  db.getAllPosts(function(err, posts) {
    reply.view("index", {
      posts: posts,
      title: "Home"
    });
  })
};