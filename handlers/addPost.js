var db = require("../db");

module.exports = function(req, reply) {
  reply.view("post", {
      title: "Add Post",
      post: {
          id: "new"
      }
    });
};