// // these are authentication routes

import express from "express";
import jwt, { verify } from "jsonwebtoken";
import argon2 from "argon2";
import prisma from "../db/index.js";

const router = express.Router();

router.post("/signup", async (request, response) => {
  try {
    //Finds a user by their username
    const user = await prisma.user.findFirst({
      where: {
        username: request.body.username,
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
            username: request.body.username,
            password: hashedPassword,
          },
        });

        //If the new user data is returned
        if (newUser) {
          //Send back a status of "Created"
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
  } catch (e) {
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
        username: request.body.username,
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
            user: {
              username: foundUser.username,
              id: foundUser.id,
            },
          },
          "thisIsASuperSecretKey"
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