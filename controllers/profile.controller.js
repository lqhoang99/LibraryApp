const shortid = require("shortid");
var db = require("../db.js");
var User=require('../models/user.model');
const datauri = require("datauri");
const path = require("path");

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const DatauriParser = require("datauri/parser");
const dUri = new DatauriParser();

module.exports.profile = function(req, res) {
  res.render("profile/index");
};
module.exports.updateAvatar = function(req, res) {
  res.render("profile/updateAvatar");
};
module.exports.postUpdateUser = (req, res) => {
  var id = req.params.id;
  var upUser = req.body.upUser;
  var upEmail = req.body.upEmail;
  User.updateOne({_id:id},{name:upUser});
  User.updateOne({_id:id},{email:upEmail});
  res.redirect("/profile");
};
module.exports.postAvatarUser = (req, res) => {
  var id = req.params.id;
  const dataUri = req =>
    dUri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );
  const file = dataUri(req).content;
  cloudinary.uploader.upload(file, function(error, result) {
    User.updateOne({_id:id},{avatarUrl:result.url});
  });
  res.redirect("/profile");
};
