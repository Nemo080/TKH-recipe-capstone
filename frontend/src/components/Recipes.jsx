import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// function that makes an API call to get a random set of recipes
function Recipes() {
  const [recipe, setRecipe] = useState([]);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [mealType, setMealType] = useState([]);

  useEffect(() => {
    Promise.all([getRecipes(), localRecipes()]).then((values) => {
      console.log(values);
      setFilteredRecipe([...values[0], ...values[1]]);
      setRecipe([...values[0], ...values[1]]);
    });
  }, []);

  // function that retrieves recipes saved in the database
  const localRecipes = async () => {
    const data = await fetch("http://localhost:3000/recipe/recipes");
    const fetchedData = await data.json();
    console.log(fetchedData);
    return fetchedData.recipes.map((recipe) => {
      recipe.isUserMade = true;
      return recipe;
    });
  };

  // function that retrieves recipes from spoonacular
  const getRecipes = async () => {
    const check = localStorage.getItem("recipes");
    if (check) {
      return JSON.parse(check);
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=45`
      );
      const data = await api.json();
      localStorage.setItem("recipes", JSON.stringify(data.recipes));
      setRecipe(data.recipes);
      return data.recipes;
    }
  };
  const handleMealTypeChange = (e) => {
    setMealType(e.target.value);
    filteredRecipes();
  };
  const filteredRecipes = () => {
    const allRecipes = [...recipe];
    const filteredRecipe = allRecipes.filter((frecipe) => {
      if (frecipe.dishTypes) {
        return frecipe.dishTypes.includes(mealType);
      }
    });
    setFilteredRecipe(filteredRecipe);
  };
  return (
    <>
      <div className="my-8 ml-12">
        <select
          value={mealType}
          onChange={handleMealTypeChange}
          className="select select-warning w-full max-w-xs bg-orange-700"
        >
          <option defaultValue="" selected>
            Select a type of meal
          </option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snack">Snack</option>
          <option value="dinner">Dinner</option>
        </select>
        <button
          onClick={() => setFilteredRecipe(recipe)}
          className="btn glass px-5 ml-8"
        >
          Reset
        </button>
      </div>

      <div className="rounded-3xl overflow-hidden grid grid-cols-3 gap-y-2 justify-items-center mb-8">
        {filteredRecipe && filteredRecipe.length >= 1 ? (
          filteredRecipe.map((recipe) => (
            <Link to={"/app/recipe/" + recipe.id}>
              <div className="card w-96 bg-base-100 shadow-xl mb-6" key={recipe.id}>
                <figure>
                  <img src={recipe.image} alt={recipe.image} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {recipe.title}
                    {recipe.isUserMade ? (
                      <div className="badge badge-secondary">User</div>
                    ) : (
                      <div className="badge badge-primary">Spoonacular</div>
                    )}
                  </h2>
                  <p>{recipe.ingredients}</p>
                  <p>{recipe.equipment}</p>
                  <p>{recipe.directions}</p>
                  <p>{recipe.author}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h2>No recipe found, select another query</h2>
        )}
      </div>
    </>
  );
}
export default Recipes;
