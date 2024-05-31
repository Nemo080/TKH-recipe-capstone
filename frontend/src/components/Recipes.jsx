import { useEffect, useState} from "react";
import Category from "./Category"
import Cuisine from "./Cuisine";

// function that makes an API call to get a random set of recipes
function Recipes(){
 const [recipe, setRecipe] = useState([]);
 useEffect(()=>{
    getRecipes();
    },[]);
    
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
    return(
        <>
        <Category/>
        <Cuisine/>
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