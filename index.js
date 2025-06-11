import { configDotenv } from "dotenv";
import express from "express";
import ConnectDb from "./db/db.js";
import userRoutes from './routes/userRoutes.js'
import plantRoutes from './routes/plantRoutes.js'
import session from "express-session";
import passport from "./utils/passport.js";
import cors from 'cors'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors({ origin: "*", credentials: true }));


//Function Calls 
configDotenv()

//Db function
ConnectDb()

//Routes 
app.use('/auth',userRoutes)

// Plants Routes 
app.use('/plants',plantRoutes)




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
      failureRedirect: "http://localhost:3000/login",
    }),
    (req, res) => {
      res.redirect("myapp://auth-success"); // Redirect to React Native app
    }
  );

// Google Authentication Route
app.get("/auth/google/callback", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    res.redirect("myapp://auth-success"); // Redirect to React Native app
  }
);

app.listen(8000,()=>{
    console.log('Server Is Started')
})