const { default: mongoose } = require("mongoose");

const PostSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'
  } ,
  socialAccountId : {
    type : mongoose.Schema.Types.ObjectId , // ObjectId: A 12-byte identifier consisting of timestamp, machine identifier, process id, and counter
    ref : 'SocialAccountSchema'
  } ,
  content : { 
    type : String 
  } ,  
  mediaUrl : {
    type : String 
  } ,
  scheduledTime : Date ,
  status : {
    type : String ,

  } ,
  platformResponse : Object 


} , {timestamps: true}) ;
const PostSchemaModel = mongoose.model('PostSchema' ,PostSchema ) ;

module.exports = PostSchemaModel ;