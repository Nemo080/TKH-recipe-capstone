const express = require('express');
const prisma = require("../db");
import { checkIfAuthenticated } from '../middleware/authMiddleware';

const router = express.Router();

router.post ("/create-post", checkIfAuthenticated, async (req, res)=>{
    try{
        req.body= ({ title,content })
        // Create a new post associated with the userId
        await prisma.post.create({
        data: {
          title,
          content,
          userId,
        },
      });
      res.redirect("/dashboard");
    }
    

    catch { error => {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }

    }
})