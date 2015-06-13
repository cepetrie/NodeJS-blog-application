var db = require("../db");

module.exports = function(req, reply) {
    console.log(req.state);
    if (!req.state.user) {
        return reply.redirect("/login");   
    }
  reply.view("post", {
      title: "Add Post",
      post: {
          id: "new"
      }
    });
};