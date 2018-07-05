var express = require("express");
var app = express();


app.use(express.static("public"));

//Tells the server we will be passing in ejs files
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
   
});

app.get("/love/:thing", function(req,res){
    var thing = req.params.thing;
    //Pass variables to the .ejs file as objects
    
    res.render("love", {thingVar:thing});
})

app.get("/posts", function(req,res){
    var posts = [
        {title:"post 1", author:"Rayna"},
        {title:"post 2", author:"Jose"},
        {title:"post 2", author:"Max"}
        ];
    
    res.render("post", {posts:posts});
})




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
})