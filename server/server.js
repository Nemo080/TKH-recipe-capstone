import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

const logger = (req, _res, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${time} ${req.method}: ${req.url}`);
    next();
};
app.use(cors())
// app.use(bodyParser.json());
app.use(express.json())
app.use(logger);
app.use("/auth", authRoutes)
app.use('/recipe', recipeRoutes)

// Example user profile and recipe data
let userProfile = {
  user: { name: 'User Name', pronouns: 'Pronouns' },
  recipes: []
};

// Fetch user profile
app.get('/user-profile', (req, res) => {
  res.json(userProfile);
});

// Create a new recipe
app.post('/user-profile', (req, res) => {
  const newRecipe = req.body;
  newRecipe.id = userProfile.recipes.length + 1; // Generate a new ID
  userProfile.recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Update an existing recipe
app.put('/user-profile/:id', (req, res) => {
  const recipeId = parseInt(req.params.id, 10);
  const updatedRecipe = req.body;
  const recipeIndex = userProfile.recipes.findIndex((r) => r.id === recipeId);
  if (recipeIndex !== -1) {
    userProfile.recipes[recipeIndex] = { id: recipeId, ...updatedRecipe };
    res.status(200).json(userProfile.recipes[recipeIndex]);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

// Delete an existing recipe
app.delete('/user-profile/:id', (req, res) => {
  const recipeId = parseInt(req.params.id, 10);
  userProfile.recipes = userProfile.recipes.filter((r) => r.id !== recipeId);
  res.status(200).json({ message: 'Recipe deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
