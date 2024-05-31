import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// POST route to create a new recipe
router.post("/", async (request, response) => {
  try {
    const existingRecipe = await prisma.recipe.findFirst({
      where: {
        title: request.body.title,
      },
    });

    if (existingRecipe) {
      response.status(401).json({
        success: false,
        message: "Recipe already exists",
      });
    } else {
      try {
        const newRecipe = await prisma.recipe.create({
          data: {
            title: request.body.title,
            ingredients: request.body.ingredients,
            equipment: request.body.equipment,
            instructions: request.body.instructions,
          },
        });

        if (newRecipe) {
          response.status(201).json({
            success: true,
          });
        } else {
          response.status(500).json({
            success: false,
            message: "Something went wrong",
          });
        }
      } catch (error) {
        response.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// PUT route to update an existing recipe
router.put("/:id", async (request, response) => {
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: parseInt(request.params.id),
      },
      data: {
        title: request.body.title,
        ingredients: request.body.ingredients,
        equipment: request.body.equipment,
        instructions: request.body.instructions,
      },
    });

    if (updatedRecipe) {
      response.status(200).json({
        success: true,
      });
    } else {
      response.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// DELETE route to delete an existing recipe
router.delete("/:id", async (request, response) => {
  try {
    await prisma.recipe.delete({
      where: {
        id: parseInt(request.params.id),
      },
    });
    response.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// Get route to retrieve recipe
router.get('/recipes', async (req, res)=>{
  try {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json({
      success: true,
      recipes
    })
  } catch (error) {
    console.error(error + ' Error: something happened');
  }
})
// Get route to filter through recipes in the database
router.get('/recipes', async (req, res)=>{
  try {
    const filters = await prisma.recipe.findMany({
      where: {
        include: {
          recipes: {
            published: true,
          },
        },
      },
    });
    res.status(201).json({
      success: true,
      filters
    });
  } catch (error) {
    res.status(502).json({
      success: false,
      message: 'Something crashed',
    })
  };
});
export default router;
