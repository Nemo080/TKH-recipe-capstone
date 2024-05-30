import express from 'express';
import prisma from '../db/index.js';

const router = express.Router();

// Create a new recipe
router.post('/new-recipe', async (request, response) => {
  console.log('Received request:', request.body);

  try {
    const { title, ingredients, equipment, instructions } = request.body;

    const existingRecipe = await prisma.recipe.findFirst({
      where: { title },
    });

    if (existingRecipe) {
      return response.status(401).json({
        success: false,
        message: 'Recipe already exists',
      });
    }

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
router.put('/recipes/:id', async (request, response) => {
  console.log('Received request:', request.body);

  try {
    const { id } = request.params;
    const { title, ingredients, equipment, instructions } = request.body;

    const updatedRecipe = await prisma.recipe.update({
      where: { id: Number(id) },
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
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

// Delete a recipe
router.delete('/recipes/:id', async (request, response) => {
  console.log('Received request:', request.body);

  try {
    const { id } = request.params;

    await prisma.recipe.delete({
      where: { id: Number(id) },
    });

    return response.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return response.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

export default router;
