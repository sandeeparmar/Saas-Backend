const {Worker} = require("bullmq") ;
const redis = require("../config/redis") ;
const Post = require("../models/PostSchema") ;
const SocialAccount = require("../models/SocialAccountSchema") ;

const worker = new Worker(
  "post-queue" ,
  async(job) => { 
    try{
      const  { postId } = job.data ;
      const post = await Post.findById(postId).populate("socialAccountId") ;
      
      if(!post) {
        console.lof("Post Is Not Present..") ;
        return ;
      }

      const account = await SocialAccount.findById(post.socialAccountId) ;

      if(!account){
        console.log("Social account not found ") ;
        return ;
      }

      if(account.platform === 'twitter'){
        console.log("Posting on Twitter " , post.content) ;
        post.status = 'posted' ;
        post.platformResponse = {success : true , id : "12345"} ;
        await post.save() ;
      }
      else if(account.platform === 'linkedin'){
        console.log("Posting to LinkedIn:", post.content);
        post.status = "posted";
        post.platformResponse = { success: true, id: "abcde" };
        await post.save();
      }
      else {
        console.log(`⚠️ Platform ${account.platform} not supported yet`);
      }
    }
    catch(err){
      console.log("inside the worker.js file....") ;
    }
  } , {connection : redis}
) ;


worker.on("completed", (job) =>
  console.log(`✅ Job ${job.id} completed`)
);

worker.on("failed", (job, err) =>
  console.log(`❌ Job ${job.id} failed: ${err.message}`)
);