//send data to the server on the fly without form submit
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("edit-me")) {
    //e target will be html element clicked on
    //use query selector inside li element
  let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
  console.log(userInput); 
  //look inside axios library
  //on the fly post request post to the node server
  //returns promise accept promise or reject it
  //first url is the one you send post request to
  //object is data that is getting sent to url or data that server will recieve
  if (userInput) {
    axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function(){
      //do something interesting here later
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
    }).catch(function() {
      console.log("Please try again later.");
    })
  }
  //return promise
  //unsure how long the action will take.
  }
})
//send this value to the node server