var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}));

var friends = ["Tony", "Mirando", "Jennifer", "David", "Miles"];


app.get("/", function(req,res){
    res.render("home");
});

app.get("/friends", function(req,res){
    res.render("friends", {friends:friends});
});

app.post("/addFriend", function(req,res){
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    //Allows us to not get the POST popup pahe
    res.redirect("/friends");
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listeing");
});