module.exports = [
    
{
  path: "/",
  method: "GET",
  handler: require("./handlers/home")
}, {
  path: "/posts", //duplicate of the home path
  method: "GET",
  handler: require("./handlers/home")
}, {
  path: "/posts/{id}",
  method: "GET",
  handler: require("./handlers/getPost")
}, {
  path: "/posts/{id}",
  method: "POST",
  handler: require("./handlers/setPost")
}, {    
  path: "/assets/{param*}",
  method: "GET",
  handler: {
    directory: {
      path: "src"
    }
  }
}];