import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//This function retrieves the individual recipe information from Spoonacular 
function Recipe() {
    const [details, setDetails] = useState({});
    const [activeButton, setActiveButton] = useState('instructions')
    const params = useParams();

    
    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${import.meta.env.VITE_API_KEY}`);
        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData);
    };
    useEffect(() => {
        fetchDetails();
    }, [params.id])

    return (
        //this renders either the istructions, or the ingredients (depending on whichever is active)
        <div className>
            <div>
                <h2 className="mb-2rem">{details.title}</h2>
                <img className=""src={details.image} alt={details.image} />
            </div>
            <div>
                <button className="btn btn-warning"
                    onChange={activeButton === 'instructions' ? 'active' : ''}
                    onClick={() => setActiveButton('instructions')}>
                    Instructions
                </button>
                <button className="btn btn-warning"
                    onChange={activeButton === 'ingredients' ? 'active' : ''}
                    onClick={() => setActiveButton('ingredients')}>
                    Ingredients
                </button>
                {activeButton === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                        <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                    </div>
                )}
                {activeButton === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    )
}
export default Recipe

