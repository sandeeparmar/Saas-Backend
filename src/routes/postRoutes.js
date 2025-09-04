const express = require('express');
const postRouter = express.Router();
const schedulePost = require("../middleware/postController");

postRouter.post("/posts" , schedulePost); 

module.exports = postRouter ;