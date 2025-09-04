const { default: mongoose } = require("mongoose");

const SubscriptionSchema = mongoose.Schema({
   userId : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'
   } ,
   planId : {
     type : mongoose.Schema.Types.ObjectId ,
     ref : 'Plan' 
   } ,
   startDate : {
    type : Date ,
   } ,
   endDate : {
    type : Date ,
    
   } ,
   isActive : {
    type :Boolean ,
    default : false , 
   } ,
   paymentDetails : {
    type : Object ,
   }
}) ;

const SubscriptionSchemaModel = mongoose.model('SubscriptionSchema' , SubscriptionSchema);

module.exports = SubscriptionSchemaModel ;