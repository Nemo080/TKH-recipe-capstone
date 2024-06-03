import { useEffect, useState} from "react";


// function that makes an API call to get a random set of recipes
function Recipes(){
 const [recipe, setRecipe] = useState([]);
 const [localRecipe, setLocalRecipe] = useState([]);
 const [filteredRecipe, setFilteredRecipe] = useState([]);
 const [cuisine, setCuisine] = useState([]);

 useEffect(()=>{
    getRecipes();
    localRecipes();
    },[filteredRecipe]);
// function that retrieves recipes saved in the database
    const localRecipes = async () =>{
        const data = await fetch('http://localhost:3000/recipe/recipes');
        const recipes = await data.json();
        console.log(recipes)
        setLocalRecipe(data.recipes);
    };
// function that retrieves recipes from spoonacular
    const getRecipes = async () =>{
       const check = localStorage.getItem('recipes');
       if (check) {
        setRecipe(JSON.parse(check));
       } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&includeNutrition=true&number=5`)
        const data = await api.json();
        localStorage.setItem('recipes', JSON.stringify(data.recipes));
        setRecipe(data.recipes);
        console.log(data.recipes);
       }
    };
    const handleCuisineChange = (e) =>{
        setCuisine(e.target.value);
        filteredRecipes();
    };
    const filteredRecipes = () => {
        const allRecipes = [...recipe, ...localRecipe];
        const filteredRecipe = allRecipes.filter((recipe)=>{
            if (cuisine === 'italian'){
                return recipe.cuisine === 'italian';
            } else if (cuisine === 'american'){
                return recipe.cuisine === 'american';
            } else {
                return filteredRecipe;
            }
        });
        setFilteredRecipe(filteredRecipe);
        return (
            <div>
                <select value={cuisine} onChange={handleCuisineChange}>
                    <option value=''>Select a cuisine</option>
                    <option value='italian'>Italian</option>
                    <option value='american'>American</option>
                </select>
                <ul>
                    {filteredRecipes.map((recipe)=>{
                        <li key={recipe.id}>{recipe.name}</li>
                    })}
                </ul>
            </div>
        )
    }
    return(
        <>
        <div>
        {localRecipe && localRecipe.map(item=>{
                return(
                    <div key={item.id}>
                        <p>{item.title}</p>
                        <p>{item.ingredients}</p>
                        <p>{item.equipment}</p>
                        <p>{item.directions}</p>
                        <p>{item.author}</p>
                    </div>
                )
            })}
        </div>
        <div className="recipe-card">
            {recipe.map(item=>{
                return(
                    <div key={item.id}>
                        <p>{item.title}</p>
                        <img className="recipe-image" 
                        src={item.image} alt={item.title}/>
                    </div>
                );
            })};
        </div>
        </>
    );
}
export default Recipes
