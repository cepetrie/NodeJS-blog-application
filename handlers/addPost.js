var db = require("../db");

module.exports = function(req, reply) {
       if (!req.state.user) {
        return reply.redirect("/login");   
    }
  reply.view("post", {
      title: "Add Post",
      post: {
          slug: "new"
      }
    });
};