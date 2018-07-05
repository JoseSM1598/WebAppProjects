var  express = require("express"),
     app =  express(),
     bodyparser = require("body-parser"),
     mongoose = require("mongoose");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/yelpcamp", function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});
//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name:"Granite Hill",
//     image:"https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b084690f83c5e63fafd161f8bc729a1f&auto=format&fit=crop&w=800&q=60",
//     description: "This is a huge grnaite hill campground blah blah blah blah"
//
// }, function(err, camp){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("NEW CAMPGROUND");
//         console.log(camp);
//     }
// });


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, all_campgrounds){
      if(err){
        console.log(err);
      }else{
        res.render("index", {campgrounds:all_campgrounds});
      }
    });

});

//CREATE ROUTE
app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    //Set up campground using Schema defined earlier
    var newCamp = {
        name:name,
        image:img,
        description:desc
    };
    //Create a new campground and save to database
    Campground.create(newCamp, function(err, camp){
      if(err){
        //Send the form back to the user if there is an error
        console.log(err);
      }else{
        //redirect back to campground page
        res.redirect("/campgrounds");
      }
    });
});

//NEW ROUTE
app.get("/campgrounds/new", function(req,res){
    res.render("new");

});

app.get("/campgrounds/:id", function(req, res){
    //find campground with provided //ID
    //Render show page with that campground
    //We have to use 'id' because that is how we defined it in the route
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground){
        if(err){
          console.log(err);
        }else{
           res.render("show",{campground:foundCampground});
        }

    });
});




app.listen(3000, function(){
    console.log("YelpCamp Server has started");
});
