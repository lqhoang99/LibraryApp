
var shortid=require('shortid');
var Session=require('../models/session.model');
var Transaction=require('../models/transaction.model');
module.exports.addToCart =async function(req, res, next) {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  var sachObject={bookId:bookId};
   var session=await Session.findOne({ sessionId: sessionId });
   session.cart.push(sachObject);
  //  Session.update({ sessionId: sessionId },{numCart:(session.numCart+1)});
   session.save();

  res.redirect("/books");
};
module.exports.thue = async function(req, res, next) {
  var userId= req.signedCookies.userId;
  if(!userId){
    res.redirect("/auth/login");
    return;
  }
  var sessionId = req.signedCookies.sessionId;
  var object = await Session.findOne({ sessionId: sessionId });
  var cart=object.cart;

  for(var i of cart){
    Transaction.create({
      userId:userId,
      bookId:i.bookId,
      isComplete:false
    });
  }
  Session.update({sessionId:sessionId},{cart:[]});
  res.redirect("/books");
};