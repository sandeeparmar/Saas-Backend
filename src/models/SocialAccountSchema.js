const { default: mongoose } = require("mongoose");

const SocialAccountSchema = mongoose.Schema({
   userId : {
     type : mongoose.Schema.Types.ObjectId  ,
     ref : 'User'  
   } ,
   platform : {
      type : String , 
      enum : ['facebook' , 'instagram' , 'x' , 'linkedin']
   } ,
   accessToken : {
    type : String 
   } ,
   refreshToken : {
     type : String 
   }  ,
   accountToken : {
    type : String 
   } ,
   accountId : {
    type : String 
   }

} , {timestamps : true} 
) ;

const SocialAccountSchemaModel = mongoose.model('SocialAccountSchema' , SocialAccountSchema) ;

module.exports = SocialAccountSchemaModel ;
