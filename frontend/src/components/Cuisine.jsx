import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Cuisine(){
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name)=>{
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&includeNutrition=true&number=5&cuisine=${name}`)
        const recipes = await data.json();
        setCuisine(recipes.results);
        
    };
    useEffect(()=>{
        getCuisine(params.type)
     },[params.type]);  
     return(
        <div>
            {cuisine.map((item)=>{
                return(
                    <div key={item.id}>
                        <img src={item.image}/>
                        <h4>{item.title}</h4>
                    </div>
                )
            })}
        </div>
     )
}

export default Cuisine;