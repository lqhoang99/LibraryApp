const shortid = require("shortid");
var db = require("../db.js");
var Transaction=require('../models/transaction.model');
module.exports.index = async function (req, res) {
 var Transactions =await Transaction.find();
 console.log(Transactions);
  var matchedTransactions = Transactions.filter(function(Transaction) {
    return Transaction.userId == req.signedCookies.userId && !req.signedCookies.isAdmin;
  });
  console.log(matchedTransactions);
  res.render("transactions/index", {
    transactions: matchedTransactions
  });
};

module.exports.create = (req, res) => {
  res.render("transactions/create");
};

module.exports.postCreate =async (req, res) => {
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  var Transactions =await Transaction.find();
  Transaction.create(req.body)

  res.redirect("/transactions");
};

module.exports.completeUser = (req, res) => {
  var id = req.params.id;
  if (id) {
    Transaction.update({id:id},{isComplete:true});
    res.redirect("/transactions");
  }
};
