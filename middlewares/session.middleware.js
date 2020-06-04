var shortid=require('shortid')
var Session=require('../models/session.model');
module.exports=function(req,res,next){
    if(!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        
        res.cookie('sessionId',sessionId,{
            signed:true
        });
        

        Session.create({
            cart:[],
            numCart:0,
            sessionId:sessionId
        });
    
    }  
        next();
}