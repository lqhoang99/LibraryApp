const shortid = require("shortid");
//var db = require("../db.js");
var User=require('../models/user.model');
module.exports.index =async (req, res) => {
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 9;
  // var start = (page - 1) * perPage;
  // var end = page * perPage;
  // // res.render("users/index", {
  // //   users: db.get("users").value().slice(start,end),
  // //   page:req.query.page
  // // });
  var users=await User.find();
  res.render("users/index", {
    users: users,
   // page:req.query.page
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.update = (req, res) => {
  res.render("users/update");
};

module.exports.deleteUser = (req, res) => {
  var id = req.params.id;
  User.findOneAndDelete({ _id: id })
  res.redirect("/users");
};

module.exports.updateUser = (req, res) => {
  var id = req.params.id;
  var user=User.findOne({_id:id});
  res.render("users/update", { id: id, user: user });
};

module.exports.profile = (req, res) => {
  var id = req.params.id;
  var user=User.findOne({_id:id});
  res.render("users/profile", { id: id, user: user });
};


module.exports.postCreate = (req, res) => {
  User.create(req.body);
  res.redirect("/users");
};

module.exports.postUpdateUser = (req, res) => {
  var id = req.params.id;
  var upuser = req.body.upuser;
  User.updateOne({_id: id},{ name: upuser});
  res.redirect("/users");
};


