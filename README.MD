/backend
 ├── /src
 │    ├── /config
 │    │     ├── db.js           
 │    │     ├── redis.js        
 │    │
 │    ├── /models
 │    │     ├── User.js
 │    │     ├── SocialAccount.js
 │    │     ├── Post.js
 │    │     ├── Plan.js
 │    │     └── Subscription.js
 │    │
 │    ├── /routes
 │    │     ├── authRoutes.js
 │    │     ├── postRoutes.js
 │    │     └── socialRoutes.js
 │    │
 │    ├── /controllers=middleware
 │    │     ├── authController.js
 │    │     ├── postController.js
 │    │     └── socialController.js
 │    │
 │    ├── /jobs
 │    │     ├── queue.js        
 │    │     └── worker.js       
 │    │
 │    ├── app.js                
 │    └── server.js             
 │
 ├── package.json
 └── .env


#USER FLOW DIAGRAM 


User visits SaaS Website
           │
           ▼
      Sign Up / Login
           │
           ▼
        Dashboard
        ┌───────┬───────────┐
        │                   │
        ▼                   ▼
Connect Social          Create & Schedule Post
   Accounts                    │
                               ▼
             ┌───────────Save Metadata───────────┐
             │                                   │
             ▼                                   ▼
      MongoDB (Post DB)      BullMQ Queue (Redis)
                                     │
                                     ▼
                       Worker executes at time
                                     │
                                     ▼
                     Publish via Social Media API
                                     │
                                     ▼
                        User views Post & Analytics
                                     │
                                     └───> Back to Dashboard
