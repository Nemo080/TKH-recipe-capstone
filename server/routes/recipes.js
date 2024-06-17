import express from 'express';
// import multer from 'multer';
import prisma from '../db/index.js';

const router = express.Router();

// Recipes are being posted in the UserProfile page from the CRUDRecipe form

// Fetch user profile including recipes
router.get('/user-profile', async (request, response) => {
  try {
    const userToken = request.headers.authorization.split(' ')[1]; // Assuming you have a way to get the user token
    const user = await prisma.user.findUnique({
      where: { token: userToken }, // Replace this with your user identification logic
      include: { recipes: true },
    });

    if (!user) {
      return response.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return response.status(200).json({
      success: true,
      user: { name: user.name, pronouns: user.pronouns },
      recipes: user.recipes,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return response.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

// Create a new recipe
router.post('/user-profile', async (request, response) => {
  try {
    const { title, ingredients, equipment, instructions } = request.body;

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        ingredients,
        equipment,
        instructions,
      },
    });

    return response.status(201).json({
      success: true,
      recipe: newRecipe,
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return response.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

// Update a recipe
router.put('/user-profile/:id', async (request, response) => {
  const { id } = request.params;
  const { title, ingredients, equipment, instructions } = request.body;

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: parseInt(id, 10) }, // Ensure id is an integer
      data: {
        title,
        ingredients,
        equipment,
        instructions,
      },
    });

    return response.status(200).json({
      success: true,
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return response.status(500).json({
      success: false,
      message: 'Failed to update recipe',
      error: error.message,
    });
  }
});

// Delete a recipe
router.delete('/user-profile/:id', async (request, response) => {
  const { id } = request.params;

  try {
    await prisma.recipe.delete({
      where: { id: parseInt(id, 10) }, // Ensure id is an integer
    });

    return response.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return response.status(500).json({
      success: false,
      message: 'Failed to delete recipe',
      error: error.message,
    });
  }
});

export default router;
