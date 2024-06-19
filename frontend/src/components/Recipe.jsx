import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Recipe(){
    const [details, setDetails] = useState({});
    const params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${import.meta.env.VITE_API_KEY}`);
        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData);
    };
    useEffect(()=>{
        fetchDetails();
    },[params.id])
    return (
        <div>
       
        <h2>{details.title}</h2>
        <img src={details.image} alt=''/>
        </div>
    )
}
export default Recipe

