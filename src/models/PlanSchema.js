const { mongo, default: mongoose } = require("mongoose");

const PlanSchema = mongoose.Schema({
  name  : { 
    type : String 
  } ,
  price : {
    type :Number 
  } ,
  postLimit  :{
    type : Number 
  } ,
  accountLimit : {
    type : Number 
  } ,
  features : {
     type : [String] 
  }
}) ;

const PlanSchemaModel = mongoose.model('PlanSchema'  ,PlanSchema ) ;
module.exports = PlanSchemaModel ; 
