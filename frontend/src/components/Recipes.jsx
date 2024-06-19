import { useEffect, useState} from "react";
import { Splide, SplideSlide} from '@splidejs/react-splide';
import { Link } from 'react-router-dom' 
import '@splidejs/react-splide/css';


// function that makes an API call to get a random set of recipes
function Recipes(){
 const [recipe, setRecipe] = useState([]);
 const [filteredRecipe, setFilteredRecipe] = useState([]);
 const [mealType, setMealType] = useState([]);

 useEffect(()=>{
    Promise.all(
        [getRecipes(), localRecipes()]
    ).then(
        (values) =>{
            console.log(values);
            setFilteredRecipe([...values[0], ...values[1]]);
            setRecipe([...values[0], ...values[1]]);
        }
    )},[]);
// function that retrieves recipes saved in the database
    const localRecipes = async () =>{
        const data = await fetch('http://localhost:3000/recipe/recipes');
        const fetchedData = await data.json();
        console.log(fetchedData)
       return fetchedData.recipes
       
    };
// function that retrieves recipes from spoonacular
    const getRecipes = async () =>{
       const check = localStorage.getItem('recipes');
       if (check) {
        return JSON.parse(check);
       } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=9`)
        const data = await api.json();
        localStorage.setItem('recipes', JSON.stringify(data.recipes));
        setRecipe(data.recipes);
        console.log(data.recipes);
        return data.recipes 
       }
    };
    const handleMealTypeChange = (e) =>{
        setMealType(e.target.value);
        filteredRecipes();
    };
    const filteredRecipes = () => {
        const allRecipes = [...recipe];
        const filteredRecipe = allRecipes.filter((recipe)=>{
            return recipe.dishTypes.includes(mealType)
        });
        setFilteredRecipe(filteredRecipe);
    };

    console.log(filteredRecipe)
    return(
        <>
        <div>
        <select value={mealType} onChange={handleMealTypeChange} 
        className="select select-warning w-full max-w-xs bg-orange-700">
                    <option defaultValue='' selected>Select a type of meal</option>
                    <option value='breakfast'>Breakfast</option>
                    <option value='lunch'>Lunch</option>
                    <option value='snack'>Snack</option>
                    <option value='dinner'>Dinner</option>
                </select>
                <br/>
                <br/>
                <button onClick={()=>(setFilteredRecipe(recipe))} 
                className='btn glass bg-orange-700 px-5'>Reset</button>
                <br/>
                <ul>
                    {localRecipes &&
                    localRecipes.length >= 1 &&
                    localRecipes.map((recipe)=>(
                        <div key={recipe.id}>
                        <p>{recipe.title}</p>
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.equipment}</p>
                        <p>{recipe.directions}</p>
                        <p>{recipe.author}</p>
                        </div>
                    ))}
                </ul>
        </div>
        <div className="recipe-card">
            <Splide options={{perPage: 3, gap: '4rem', pagination: false,}}>
            {filteredRecipe && filteredRecipe.length >=1 ? filteredRecipe.map((item)=>(
                    <SplideSlide key={item.id}>
                    <div>
                        <p>{item.title}</p>
                        <Link to={'/app/recipe/' + item.id}>
                        <img className="recipe-image" 
                        src={item.image} alt={item.title}/>
                        </Link>
                    </div>
                    </SplideSlide>
            )): (<h2>No recipe found, select another query</h2>)}
            </Splide>
        </div>
        </>
    );
}
export default Recipes
