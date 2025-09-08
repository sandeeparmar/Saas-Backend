const SocialAccount = require("../models/SocialAccountSchema");
const User =  require("../models/User.js") ;

const addAccount = async (req, res) => {
  try {
    const {  platform, accessToken, refreshToken, accountName, accountId } = req.body;
    
    const check = await SocialAccount.findOne({accountId}) ;
    
    if(check){
       return res.status(401).json({success : false  , message : "Your are already registered.." , check} );
    }

    const account = await SocialAccount.create({
      userId,
      platform,
      accessToken,
      refreshToken,
      accountName,
      accountId,
    });

    res.status(201).json({ success: true, account });

    
  } catch (err) {
    console.error("Error adding social account:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAccounts = async (req, res) => {
  try {
    const userId = req.user._id; 

    const accounts = await SocialAccount.find({ userId });
  
    if(accounts.length == 0){
       res.status(200).json({success :true , message : "Your are not add any type of account inside your profile"})
    }
    else {
      res.json({ success: true, accounts });
    }
  } catch (err) {
    console.error("Error fetching accounts:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const id  = req.user._id;
    await SocialAccount.findByIdAndDelete(id);

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {addAccount , getAccounts , deleteAccount} ;
