const mongoose = require("mongoose") ;
const validator = require('validator');
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;

const userSchema = mongoose.Schema({
  firstName : {
    type : String ,
    required : true ,
    trim : true ,
    validate : {
      validator(value){
        return validator.isAlpha(value) ;
      } ,
      message : "First Name must be valid..."  
    }
  } ,
  lastName : {
    type : String ,
    required : true ,
    trim : true ,
    validate : {
      validator(value){
        return validator.isAlpha(value) ;
      } ,
      message : "Last Name must be valid..."  
    }
  }, 
  emailID:{
    type : String  ,
    unique : true ,
    required : true ,
    trim : true ,
    validate: {
        validator(value){
           return validator.isEmail(value)  ;
        },
        message : "Email is not in valid form"
    } 
   },
   password:{
     type : String ,
     trim : true  ,
     required : true ,
   },
   Date :{
    type : Date ,
    default : Date.now
   },
   lastLogin : {
    type :Date ,
    default : Date.now 
   },
   subscription : {
    plan : {
      type: String, enum: ["free", "starter", "pro"], default: "free"
    } ,
    expiry : Date 
   } ,   
   role:{
     type:String ,
     required : true 
   }
} ,{
  timestamps : true ,
});

userSchema.methods.userToken = async function() {
   const user = this ;
   const token = await  jwt.sign({_id : user._id} , process.env.JWT_SECRET, {expiresIn: '7d'}) ;
  return token ;
} ;

userSchema.methods.validatePassword = async function(UserPassword){
  const user = this  ;
  const userHashPassword = user.password ;
  const validate = await bcrypt.compare(UserPassword , userHashPassword) ;
  return validate ;
} ;

const UserModel = mongoose.model("User" , userSchema) ;

module.exports = UserModel ;
