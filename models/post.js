var Backbone = require("backbone");
var db = require("../db");
var moment = require('moment');

var LOAD = "SELECT * FROM posts WHERE slug = $slug;";
var SAVE_NEW = "INSERT INTO posts (title, slug, content, created_at, formatted) VALUES ($title, $slug,  $content, datetime('now'), $formatted);";
var UPDATE = "UPDATE posts SET title = $title, content = $content WHERE slug = $slug;";
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
      $slug: data.slug
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
    var slug = this.get("title").toLowerCase();
    var space = /\s/g;
    slug = slug.replace(space, "-");
    
    query.run({
      $title: data.title,
      $content: data.content,
      $id: id == "new" ? undefined : data.id,
      $formatted: moment().format("dddd MMMM Do, YYYY"),
      $slug: slug
    }, done);
  }
});