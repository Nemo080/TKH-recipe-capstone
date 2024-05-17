import { useEffect} from "react";

// function that makes an API call to get a random set of recipes
function Recipes(){
 
    useEffect(()=>{
        getRecipes();
    },[])
    
    const getRecipes = async () =>{
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&includeNutrition=true&number=5`)
        const data = await api.json()
        console.log(data)
    }
    return(
        <h1>
            Recipes
        </h1>
    )
}
export default Recipes