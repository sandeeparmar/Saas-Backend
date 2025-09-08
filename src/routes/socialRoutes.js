const express =  require("express") ;
const socialRouter = express.Router() ;
const userAuth = require("../middleware/auth.js"); 
const {addAccount , getAccounts , deleteAccount} = require("../middleware/socialController");

socialRouter.post("/social/add" , userAuth , addAccount) ;

socialRouter.get("/social/account" , userAuth ,getAccounts) ;

socialRouter.delete("/delete" , userAuth  ,deleteAccount) ;

module.exports = socialRouter ;