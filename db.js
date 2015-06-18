var async = require("async");
var sqlite = require("sqlite3");
var db;

var users = {
        christina: "12345",
        guest: "guest"
    };

var database = {
        connection: null,
        init: function (ready) {
            var db = database.connection = new sqlite.Database("blog.db", function (err) {
                    if (err) {
                        console.error("Couldn't open blog database");
                        process.exit(1);
                    }
           
                    async.series([
                        function (c) {
                            db.run("CREATE TABLE IF NOT EXISTS posts (title, slug, content, created_at, formatted);", c);
                        },
                        function (c) {
                            db.run("CREATE TABLE IF NOT EXISTS users (username, session, password);", c);
                        },
                        function (c) {
                            db.run("DELETE FROM users", c);
                        },
                        function (c) {
                            db.run("INSERT INTO users (username, password) VALUES ($username, $password);", {
                                $username: "Christina",
                                $password: "abc123"
                            }, c);
                        },
                        function (c) {
                            db.run("INSERT INTO users (username, password) VALUES ($username, $password);", {
                                $username: "guest",
                                $password: "guest"
                            }, c);
                        }
                    ], function (err) {
                        db.all("SELECT * FROM users", console.log.bind(console));
                        console.log(err);
                        if (ready) ready(err);
                    });
                });
        },
        getAllPosts: function (c) {
            database.connection.all("SELECT *, rowid FROM posts ORDER BY created_at DESC;", c);
        }
    };

module.exports = database;