var express = require("express");
var request = require("request");

var app = express();
app.set("view engine", "ejs");



app.get("/results", function(req,res){
    //Obtain the search item that was inputted in the form. Remember that it is stored in the REQUEST field
    var query= req.query.search_item
    //Construct the url
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    request(url, function(error, response, body){
      if(!error && response.statusCode == 200){
          var parsed = JSON.parse(body);
          //Now pass the json data to a template
          res.render("results", {parsed:parsed});
  }
        
    })
});

app.get("/", function(req,res){
    res.render("search");
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started");
});