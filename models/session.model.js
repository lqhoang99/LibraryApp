var mongoose = require('mongoose');
var sessionSchema=new mongoose.Schema({
    cart:[ {
        bookId: String
      }],
    numCart:Number,
    sessionId:String
})
var Session=mongoose.model('Session',sessionSchema,'sessions');
module.exports=Session;