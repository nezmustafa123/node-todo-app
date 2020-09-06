let express = require('express')
let mongodb = require('mongodb')
//use mongodb package to open a connection to mondodb atlas account

let app = express()
let db 

//make contents of public folder available to this file
app.use(express.static('public'))

let connectionString = 'mongodb+srv://todoAppNode:andyroddick@cluster0.r2gvt.azure.mongodb.net/TodoAppNode?retryWrites=true&w=majority'
// TodoAppNode?retryWrites=true&w=majority
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
  //client has info about mongodb environment you connected to
  db = client.db()
  //point db variable to the client database
  app.listen(4000);
})

//express takes submitted form data and adds it 
//to body object that lives in request object
//do the same thing for async requests
app.use(express.json())
app.use(express.urlencoded({extended: false }))


app.get('/', function(req, res){
//collection named items
db.collection('items').find().toArray(function(err, items){
     console.log(items)
res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple To-Do App</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h1 class="display-4 text-center py-1">Full-stack To-Do App using node and express</h1>
    
    <div class="jumbotron p-3 shadow-sm">
      <form action="/create-item" method="POST">
        <div class="d-flex align-items-center">
          <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
          <button class="btn btn-primary">Add New Item</button>
        </div>
      </form>
    </div>
    
    <ul class="list-group pb-5">
      ${items.map(function(item){
        return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${item.text}</span>
        <div>
          <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>`
      }).join('')}
    </ul>
    
  </div>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="/browser.js"></script>
</body>
</html>`)
  })
})

//browser.js for browser based code
//when web browser sends post request to this address
app.post('/create-item', function(req, res){
  //create a new item in collection
 db.collection('items').insertOne(
   //text from input element with name attribute item
   //insert one method compeletes 
  //  create new object with property text
   {text: req.body.item}, function() {
    res.redirect('/')
   })
})

//recieve what happens in the browser.js on the server side
//when app sends post request to this address 
//console log
app.post('/update-item', function(req, res) {
  //data that axios request is sending over
  //method second argument tells mongo db what you want to update which field and property
  //include field being updated
  //first argument which document you want to update based on id
db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {text: req.body.text}}, function(){
  res.send("Success")
 })
})

