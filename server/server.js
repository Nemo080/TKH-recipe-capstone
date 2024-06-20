import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";
import userRoutes from "./routes/users.js";
import passport from "passport"; 
import session from 'express-session';
import passportjwt from "./middleware/authMiddleware.js"


dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

const logger = (req, _res, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${time} ${req.method}: ${req.url}`);
    next();
};
app.use(cors())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
})); 
app.use(passport.initialize());
app.use(passport.session());
passportjwt(passport);
app.use(express.json())
app.use(logger);
app.use("/auth", authRoutes)
app.use('/recipe', recipeRoutes(passport))
app.use('/users', userRoutes(passport))


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
