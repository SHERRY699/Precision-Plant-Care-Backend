import { configDotenv } from "dotenv";
import express from "express";
import ConnectDb from "./db/db.js";
import userRoutes from './routes/userRoutes.js'
import session from "express-session";
import passport from "./utils/passport.js";

const app = express()

// Middlewares
app.use(express.json())


//Function Calls 
configDotenv()

//Db function
ConnectDb()

//Routes 
app.use('/auth',userRoutes)


// Facebook 
app.use(
    session({
      secret: process.env.SESSION_SECRET ,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Facebook Login Route
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );
  
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/login",
      successRedirect: "/dashboard",
    })
  );

// Google 
app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login", 
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard"); 
  }
);

app.listen(8000,()=>{
    console.log('Server Is Started')
})