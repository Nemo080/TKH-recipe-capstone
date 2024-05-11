### Entity Relationship Diagram for Recipe App

![image](https://github.com/pujaroy280/TKH-recipe-capstone/assets/62675121/8715bf5e-45dc-46d6-b03d-5f5659e4fe80)

https://miro.com/app/board/uXjVKQu_78o=/?share_link_id=601303475505

**Explanation:**

Users: Stores information about users who use the app. UserID serves as the primary key.

Recipes: Contains details about recipes, with RecipeID as the primary key. CreatorID is a foreign key linking to Users, indicating the creator of the recipe.

UserRecipes: This table represents the many-to-many relationship between Users and Recipes. It tracks which recipes each user has saved, liked, or interacted with. UserID and RecipeID together form a composite primary key.

Ingredients: Stores information about ingredients used in recipes. IngredientID is the primary key.

FoodCategory: Represents categories or types of food (e.g., Desserts, Main Courses, Appetizers). CategoryID serves as the primary key.

Cuisine: Represents different cuisines (e.g., Italian, Mexican, Indian). CuisineID is the primary key.

**Relations:**

Users → UserRecipes: One user can have multiple user-recipe relationships.
Recipes → UserRecipes: One recipe can be saved/liked by multiple users.
Recipes → Ingredients: One recipe can have multiple ingredients, establishing a one-to-many relationship.
FoodCategory → Recipes: One food category can have multiple recipes.
Cuisine → Recipes: One cuisine can have multiple recipes.

This ERD provides a basic structure for your Recipe App's database, capturing the relationships between users, recipes, ingredients, food categories, and cuisines.
