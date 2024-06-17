import express from 'express';
import prisma from '../db/index.js';

const router = express.Router();

// Create a new recipe
router.post('/new-recipe', async (request, response) => {
  console.log('Received request:', request.body);

  try {
    const { title, ingredients, equipment, instructions, authorId } = request.body;

    // Verify the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!existingUser) {
      return response.status(404).json({
        success: false,
        message: 'Author not found',
      });
    }
        // Check if a recipe with the same title already exists
        const existingRecipe = await prisma.recipe.findFirst({
            where: { title },
          });
      
          if (existingRecipe) {
            return response.status(401).json({
              success: false,
              message: 'Recipe already exists',
            });
          } 
      
          // Create a new recipe
          const newRecipe = await prisma.recipe.create({
            data: {
              title,
              ingredients,
              equipment,
              instructions,
              authorId,
            },
          });
} catch (error) {
        console.error('Error fetching user profile:', error);
        return response.status(500).json({
          success: false,
          message: 'Something went wrong',
          error: error.message,
        });
}})

// Update a recipe
router.put('/recipes/:id', async (request, response) => {
  console.log('Received request:', request.body);

  try {
    const { id } = request.params;
    const { title, ingredients, equipment, instructions, authorId } = request.body;

    // Verify the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!existingUser) {
      return response.status(404).json({
        success: false,
        message: 'Author not found',
      });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: id },
      data: {
        title,
        ingredients,
        equipment,
        instructions,
        authorId,
      },
    });
} catch (error) {
    console.error('Error updating recipe:', error);
    return response.status(500).json({
      success: false,
      message: 'Failed to update recipe',
      error: error.message,
    });
  }})


// Delete a recipe
router.delete('/recipes/:id', async (request, response) => {
  console.log('Received request:', request.body);

  try {
    const { id } = request.params;

    await prisma.recipe.delete({
      where: { id: id },
    });
    
  } catch (error){
    console.error('Error deleting recipe:', error);
    return response.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
})
   
 

// Get route to retrieve all recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

// Get route to filter through recipes in the database
router.get('/recipes/published', async (req, res) => {
  try {
    const filters = await prisma.recipe.findMany({
      where: {
        published: true,
      },
    });
    res.status(201).json({
      success: true,
      filters,
    });
  } catch (error) {
    console.error('Error filtering recipes:', error);
    res.status(502).json({
      success: false,
      message: 'Something crashed',
      error: error.message,
    });
  }
});
export default router