var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//root route
router.get("/", function(req,res){
    res.render("landing");
});
        
        


// show register form
router.get("/register", function(req,res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username})
   User.register(newUser, req.body.password, function(err,user){
       if(err){
           
           req.flash("error", err.message );
           console.log(err);
           return res.redirect('/register'); //return helps to short circute 
       }
       passport.authenticate("local")(req,res,function(){ //////
       req.flash("success", "Welcome to yelp camp" + user.username )
       res.redirect("/campgrounds")});
            
       
   } )
});

//show log in form
router.get("/login", function(req,res){
    res.render("login"); //key error 
})

//handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){
        
});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "logged you out");
    res.redirect("/campgrounds");
});



module.exports = router;