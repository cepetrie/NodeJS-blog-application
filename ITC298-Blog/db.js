var async = require("async");
var sqlite = require("sqlite3");
var db; // used across this module

var database = {
  connection: null,
  init: function(ready) {
    db = new sqlite.Database("blog.db", function(err) {
      if (err) {
        console.error("Couldn't open blog database");
        process.exit(1);
      }
      
      //store the connection for outside modules to use directly
      database.connection = db;
      
      //create tables, and execute ready callback when done
      async.parallel([
        function(c) {
          db.run("CREATE TABLE IF NOT EXISTS posts (title, content, created_at);", c);
        },
        function(c) {
          db.run("CREATE TABLE IF NOT EXISTS user (firstName, lastName);", c);
        }
      ], function(err) {
        console.log(err);
        if (ready) ready(err);
      });
    });
  },
  getAllPosts: function(c) {
    db.all("SELECT title, content, rowid FROM posts;", c);
  }
};

module.exports = database;