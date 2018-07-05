var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

//Blueprints how a cat should be defined. However we can always add new variables to the object
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

var George = new Cat({
    name: "Mrs. Norris",
    age: 4,
    temperament: "Happy"
});

//Add new cats to DB

//George.save(function(err, cat){
//    if(err){
//        console.log("Something went wrong");
//    } else{
//        console.log("CAT ADDED TO DB");
//        console.log(cat);
//    }
//});

//creare() allows us to create and add objects to database instantly
Cat.create({
    name: "Pepper2",
    age:15,
    temperament:"Moody"
}, function(err, cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});


//Retrieve all cats from DB and console.log each one

Cat.find({}, function(err, cats){
    if(err){
        console.log("ERROR");
        console.log(err);
    }else{
        console.log(cats);
    }
})