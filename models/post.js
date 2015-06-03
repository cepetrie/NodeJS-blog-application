var Backbone = require("backbone");
var db = require("../db");

var LOAD = "SELECT title, content, created_at FROM posts WHERE rowid = $id;";
var SAVE_NEW = "INSERT INTO posts (title, content, created_at) VALUES ($title, $content, datetime('now'));";
var UPDATE = "UPDATE posts SET title = $title, content = $content WHERE rowid = $id;";
var LAST = "SELECT last_insert_rowid() AS rowid FROM posts;";

module.exports = Backbone.Model.extend({
  defaults: {
    name: "Untitled Post",
    title: "",
    content: "",
    id: "new"
  },
  load: function(done) {
    var self = this;
    var query = db.connection.prepare(LOAD);
    var data = this.toJSON();
    query.get({
      $id: data.id
    }, function(err, loaded) {
      self.set(loaded);
      done(err);
    });
  },
  save: function(done) {
    var self = this;
    var id = this.get("id");
    var q = id == "new" ? SAVE_NEW : UPDATE;
    var query = db.connection.prepare(q);
    var data = this.toJSON();
    query.run({
      $title: data.title,
      $content: data.content,
      $id: id == "new" ? undefined : data.id
    }, done);
  }
});