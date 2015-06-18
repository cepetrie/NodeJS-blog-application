var hapi = require("hapi");
var server = new hapi.Server({
    connections: {
        router: {
            stripTrailingSlash: true
        }
    }
});
server.connection({ port: 8000 });
var db = require("./db");
db.init(function (err) {
    if (err) {
        return console.error("db err", err);
    }
    server.start(function () {
        console.log("Server ready!");
    });
});

server.views({
    path: "views/templates",
    layoutPath: "views",
    layout: "default",
    engines: {
        html: require("handlebars")
    },
    isCached: false,
    context: {
        dev: true
    }
});

server.route(require("./routes"));