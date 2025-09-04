const { Queue } = require("bullmq") ;
const redis = require("../config/redis") ;

const postQueue = () => {
    try{
      const newQueue = new Queue("post-queue" , {connection : redis}) ;
      console.log("inside the newQueue" + newQueue) ;
    } 
    catch(err){
       console.log("inside the queue file...") ;
    }
}

module.exports = postQueue ;