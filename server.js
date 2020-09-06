let express = require("express");
let ourApp = express()
//boiler plate 
//enable feature in express so users input is accesable
ourApp.use(express.urlencoded({extended: false}))

ourApp.get('/', function(req, res){
      res.send(`
      <form action="/answer" method="POST">      
      <p>What is the colour of the sky on a clear day </p>
      <input name="skyColor" autocomplete="off">
      <button>Submit Answer</button>
      </form>
     `)
})
//what to do when post request

ourApp.post('/answer', function(req, res) {
      //post request object
 if(req.body.skyColor.toUpperCase() == "BLUE") {
   res.send(`
   <p>Congrats, that is the correct answer!</p>
   <a href="/"> Back to homepage</a>
   `)
     //back to homepage
 } else {
      res.send(`
      <p>Wrong answer you retard</p>
      <a href = "/"> Back to homepage</a>
      `)}
})

ourApp.get('/answer', function(req, res) {
      res.send("Are you lost?")
})
     

ourApp.listen(3000);