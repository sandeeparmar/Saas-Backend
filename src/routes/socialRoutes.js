const express =  require("express") ;
const socialRouter = express.Router() ;

const {addAccount , getAccounts , deleteAccount} = require("../middleware/socialController");


socialRouter.post("/social/add" , addAccount) ;

socialRouter.get("/" , getAccounts) ;

socialRouter.delete("/:id" , deleteAccount) ;

module.exports = socialRouter ;