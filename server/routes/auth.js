// // these are authentication routes

import express from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import prisma from "../db/index.js";

const router = express.Router();

router.post("/signup", async (request, response) => {
  try {
    //Finds a user by their username
    const user = await prisma.user.findFirst({
      where: {
        email: request.body.email,
      },
    });

    // if the user exists, send back a 401 because the user already exists
    if (user) {
      response.status(401).json({
        success: false,
        message: "User already exists",
      });
    } else {
      try {
        //Hashes the password using argon2
        const hashedPassword = await argon2.hash(request.body.password);

        //Adds the user to our db using the new username and the hashed password. NEVER STORE A USER PASSWORD IN PLAIN TEXT
        const newUser = await prisma.user.create({
          data: {
            email: request.body.email,
            password: hashedPassword,
            name: request.body.name,
          },
        });

        //If the new user data is returned
        if (newUser) {
          const token = jwt.sign(
            {
                email: foundUser.email,
                id: foundUser.id,
            },
            process.env.SECRET_KEY
          );
  
          response.status(201).json({
            success: true,
            token,
          });
          //Send back a status of "Created"
        } else {
          console.log("Here")
          response.status(500).json({
            success: false,
            message: "Something went wrong",
          });
        }
      } catch (error) {
        console.log(error)
        response.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    }
  } catch (e) {
    console.log(e)
    response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/login", async (request, response) => {
  try {
    const foundUser = await prisma.user.findFirstOrThrow({
      where: {
        email: request.body.email,
      },
    });

    try {
      const verifiedPassword = await argon2.verify(
        foundUser.password,
        request.body.password
      );

      if (verifiedPassword) {
        const token = jwt.sign(
          {
          
              email: foundUser.email,
              id: foundUser.id,
          
          },
          process.env.SECRET_KEY
        );

        response.status(200).json({
          success: true,
          token,
        });
      } else {
        response.status(401).json({
          success: false,
          message: "Wrong username or password",
        });
      }
    } catch (e) {
      response.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (e) {
    response.status(401).json({
      success: false,
      message: "Wrong username or password",
    });
  }
});

export default router;