import express from 'express';
import prisma from '../db/index.js';

const router = express.Router();

router.get("/me", async function (req, res){
    try {
        const userName = await prisma.user.findUnique({
            where: {id: userId},
            include: { name: true },
        });
        console.log(userName);
        return userName;
    }
    catch(error) {
        console.error(error);
        throw new Error('Error fetching user name');
    } 
    finally {
        await prisma.$disconnect();
    }
})