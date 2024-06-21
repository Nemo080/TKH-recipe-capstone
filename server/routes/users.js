import express from 'express';
import prisma from '../db/index.js';

export default function (passport){
    const router = express.Router();


router.get("/me", passport.authenticate("jwt", {session:false}), async function (req, res){
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });
  
      if (user) {
        res.json({ name: user.name });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
});
router.get('/user-profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { recipes: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user: { name: user.name, pronouns: user.pronouns },
      recipes: user.recipes,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

router.post('/user-profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { title, ingredients, equipment, instructions } = req.body;
    const userId = req.user.id;

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        ingredients,
        equipment,
        instructions,
        authorId:userId,
      },
    });

    return res.status(201).json({
      success: true,
      recipe: newRecipe,
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

router.put('/user-profile/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, equipment, instructions } = req.body;

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        ingredients,
        equipment,
        instructions,
      },
    });

    return res.status(200).json({
      success: true,
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update recipe',
      error: error.message,
    });
  }
});

router.delete('/user-profile/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.recipe.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete recipe',
      error: error.message,
    });
  }
});
return router
}
