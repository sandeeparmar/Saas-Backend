const express = require("express") ;
const app = express() ; 
const connectDB = require("./src/config/database") ;
const cookieParser = require('cookie-parser') ;
require("dotenv").config() ;
const cors = require("cors");

app.use(express.json()) ;
app.use(cookieParser()) ;



connectDB()
   .then(() => {
    console.log("Database is Connected Successfully") ;
    
    app.listen(process.env.PORT , () => {
      console.log("Hello this is from server side.") ;
    }) ;
   })
   .catch((err) =>  {
      console.error("Database is not connected " , err.message);
   }) ;


app.use(cors({
   origin  : "http://localhost:5173",
   credentials: true 
})) ;

app.get("/test", (req, res) => res.json({ message: "Backend works" }));

const authRouter = require('./src/routes/auth') ;
const postRouter = require("./src/routes/postRoutes") ;
const socialRouter = require("./src/routes/socialRoutes") ;
app.use("/", authRouter);
app.use("/", postRouter);
app.use("/", socialRouter) ;