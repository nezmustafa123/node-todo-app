//http is a part of node.
let http = require("http")
//server gets request runs function
let ourApp = http.createServer(function(req, res){


  // request object
  if (req.url == "/") {
    res.end("Hello and welcome to our home page.")
  }
  else if (req.url == "/about") {
    res.end("Thanks for visiting")
  }
  //response object 
  // res.end("Hello, and welcome to our website.")
});


//tell http server to listen
ourApp.listen(3000)