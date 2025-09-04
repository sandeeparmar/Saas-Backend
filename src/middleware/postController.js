const Post = require("../models/PostSchema") ;
const postQueue = require("../jobs/queue") ;
const { delay } = require("bullmq");

const schedulePost = async (req ,res) => {
  try{
    const {socilaAccountId , content , scheduleTime } = req.body ; 
    console.log(req.body) ;
    // if(!scheduleTime || !schedulePost || !content){
    //   return res.status(402).json({success : false , message : "Please Send Complete Data"}) ;
    // } 

    const post = await Post.create({
      userId : req.user.id ,
      socilaAccountId ,
      content , 
      scheduleTime ,
    }) ;

    await postQueue.add("publish-post" , {postId : post._id} , {delay : new Date(scheduleTime) - Date.now()}); 

    res.status(200).json({success : true ,  post}) ;
  }
  catch(err){
    res.status(500).json({success : false , message : err.message}) ;
  }
}

module.exports = schedulePost ;