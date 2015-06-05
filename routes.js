module.exports = [
    
{
  path: "/",
  method: "GET",
  handler: require("./handlers/home")
}, {
    //single-post view
    path: "/posts/{slug}",
    method: "GET",
    handler: require("./handlers/viewPost")
}, {
  path: "/posts/{slug}/edit",
  method: "GET",
  handler: require("./handlers/editPost")
}, {
  path: "/posts", //duplicate of the home path
  method: "GET",
  handler: require("./handlers/home")
},  {
  path: "/posts/new", 
  method: "GET",
  handler: require("./handlers/addPost")
}, {
  path: "/posts/{slug}",
  method: "POST",
  handler: require("./handlers/savePost")
}, {    
  path: "/assets/{param*}",
  method: "GET",
  handler: {
    directory: {
      path: "public"
    }
  }
}];