// Console log to check if the code is running
console.log("Is this thing on?");

// Import necessary packages
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: ".env" });

// Create an instance of Express app
const app = express();
const PORT = 3000;

// Set up view engine and static files
app.set("view engine", "ejs");
app.use(express.static("public"));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(process.env.MONGO_URI)
  .then((client) => {
    // Access the 'recipe' database and the 'recipes' collection
    const db = client.db("recipe");
    const recipesCollection = db.collection("recipes");

    // GET route to render the homepage with recipes data
    app.get("/", (req, res) => {
      recipesCollection
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { recipesCollection: results });
        })
        .catch((error) => console.error(error));
    });
    
    // POST route to add a new recipe
    app.post("/recipes", (req, res) => {
      recipesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.log(error));
    });

    // PUT route to update an existing recipe
    app.put("/recipes", (req, res) => {
      recipesCollection
        .findOneAndUpdate(
          { title: req.body.title },
          {
            $set: {
              title: req.body.title,
              ingredients: req.body.ingredients,
              directions: req.body.directions
            },
          },
          {
            upsert: false,
            returnNewDocument: true,
          }
        )
        .then((result) => {
          res.json("Success");
          return res;
        })
        .catch((error) => console.error(error));
    });
    
    // DELETE route to delete an existing recipe
    app.delete("/recipes", (req, res) => {
      recipesCollection
        .deleteOne({ title: req.body.title })
        .then((result) => {
          console.log(`Deleted ${req.body.title}`);
          console.log(result);
          res.json("Deleted recipe");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

// Start the server
app.listen(PORT, function () {
  console.log(`Server is live! Listening at port ${PORT}`);
});
