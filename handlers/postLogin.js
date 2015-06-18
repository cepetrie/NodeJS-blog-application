//var User = require("../models/login");
var db = require("../db");
var crypto = require("crypto");

module.exports = function (req, reply) {
    var md5 = crypto.createHash("md5");
    
    // SELECT password from users where name = $username;
    db.connection.get("SELECT * FROM users WHERE username = $username", {
        $username: req.payload.name
    }, function (err, expected) {
        
        console.log(req.payload, expected, err);
        
        if (expected && req.payload.password == expected.password) {

            var response = reply.redirect("/");
            var id = req.payload.name + Date.now();
            md5.update(id);
            id = md5.digest("hex");
            response.state("user", req.payload.name);
            response.state("session", id);
            console.log(req.payload.name, id);
            db.connection.run("UPDATE users SET session = $session WHERE username = $user", {
                $user: req.payload.name,
                $session: id
            });
        } else {
            reply.redirect("/login");
        }
    });
};



