const SocialAccount = require("../models/SocialAccountSchema");

const addAccount = async (req, res) => {
  try {
    const { userId, platform, accessToken, refreshToken, accountName, accountId } = req.body;
   

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
    const { userId } = req.query; // or req.user.id if using auth middleware
    const accounts = await SocialAccount.find({ userId });

    res.json({ success: true, accounts });
  } catch (err) {
    console.error("Error fetching accounts:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await SocialAccount.findByIdAndDelete(id);

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {addAccount , getAccounts , deleteAccount} ;
