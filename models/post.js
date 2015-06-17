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
    slug: "new"
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
    if (this.get("slug") == "new") {
      //run a save_new
      var query = db.connection.prepare(SAVE_NEW);
      var data = this.toJSON();
      var slug = this.get("title").toLowerCase();
      var space = /\s/g;
      slug = slug.replace(space, "-");

      query.run({
        $title: data.title,
        $content: data.content,
        $formatted: moment().format("dddd MMMM Do, YYYY"),
        $slug: slug
      }, done);
    } else {
      //run an update
      var query = db.connection.prepare(UPDATE);
      var data = this.toJSON();

      query.run({
        $title: data.title,
        $content: data.content,
        $slug: data.slug
      }, done);
    }
  }
});