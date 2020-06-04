const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);
var bcrypt = require("bcrypt");
const saltRounds = 10;
var User=require('../models/user.model');

module.exports.login = function(req, res) {
  res.render("auth/login");
};
module.exports.postLogin =async function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user=await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist."],
      value: req.body
    });
    return;
  }
  if (user.wrongLoginCount === 3) {
    const msg = {
      to: user.email,
      from: "lequanghoang99@outlook.com",
      subject: "Ai do dang co truy cap tai khoan cua ban",
      text: "check your acount",
      html: "<strong>check your acount</strong>"
    };
    sgMail.send(msg).then(
      () => {},
      error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  }
  if (user.wrongLoginCount < 4) {
    var check = bcrypt.compareSync(password, user.password);
    if (check === false) {
      var temp = user.wrongLoginCount + 1;
     
      User.update({email:email},{wrongLoginCount:temp});
      res.render("auth/login", {
        errors: ["Wrong password."],
        value: req.body
      });
    return;
    }
  } else {
    res.render("auth/login", {
      errors: ["Wrong password so much."],
      value: req.body
    });
    return;
  }
  console.log(user._id);
  res.cookie("userId", user._id, {
    signed: true 
  });
  
  res.redirect("/books");
};