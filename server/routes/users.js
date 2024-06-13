import express from 'express';
import prisma from '../db/index.js';

const router = express.Router();

import { checkIfAuthenticated } from '../middleware/authMiddleware.js';

router.get("/me", checkIfAuthenticated, async function (req, res){
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
  
export default router;