var  express = require("express"),
     app =  express(),
     methodOverride = require("method-override"),
     bodyparser = require("body-parser"),
     mongoose = require("mongoose");

app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set("view engine", "ejs");


mongoose.connect("mongodb://localhost:27017/blog_app", function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

var blogSchema = new mongoose.Schema({
  title:String,
  image:{type:String, default: "https://libreshot.com/wp-content/uploads/2015/05/coffee-and-laptop.jpg"},
  body:String,
  created: {type:Date, default:Date.now}
});

//so, our collection with be called 'blogs'
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   body: "HELLO THIS IS A BLOG POST"
// });

//RESTful ROUTES

app.get("/", function(req,res){
  res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs", function(req,res){
  //Display all of the blogs in the database
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err);
    }else{
      res.render("index", {blogs:blogs});
    }
  });
});

//NEW ROUTES
app.get("/blogs/new", function(req,res){
  res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req,res){
  //create blogs
  //we can simply pass req.body.blog to create since we used the blog[title] syntax
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.render("new");
    }else{
        //redirect somewhere
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req,res){
  var id = req.params.id;
  Blog.findById(id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    }else{
      res.render("show", {blog:foundBlog})
    }
  });
});


// EDIT ROUTES
app.get("/blogs/:id/edit", function(req,res){
  //We have to grab the original data in the inputs
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    }else{
      res.render("edit", {blog:foundBlog})
    }
  });
});

//UPDATE ROUTES
app.put("/blogs/:id", function(req,res){
  //Use this cool function to sweep everything up and update
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect("/blogs");
    }else{
      var showUrl = "/blogs/" + req.params.id;
      res.redirect(showUrl);
    }
  });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
  //Find blog in database and destroy
  Blog.findById(req.params.id,function(err, blog){
    if(err){
      console.log(err);
    }else{
      blog.remove();
      res.redirect("/blogs");
    }
  });


});







app.listen(3000, function(){
    console.log("YelpCamp Server has started");
});
