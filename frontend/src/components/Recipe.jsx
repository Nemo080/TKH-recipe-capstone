import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//This function retrieves the individual recipe information from Spoonacular
function Recipe() {
  const [details, setDetails] = useState({});
  const [activeButton, setActiveButton] = useState("instructions");
  const params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const detailData = await data.json();
    console.log(detailData);
    setDetails(detailData);
  };
  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  return (
    //this renders either the istructions, or the ingredients (depending on whichever is active)
    <div>
      <div className="flex flex-col items-center">
        <h2 className="mb-8 text-3xl font-semibold">{details.title}</h2>
        <img
          className="max-w-full h-auto mb-6 rounded-lg"
          src={details.image}
          alt={details.image}
        />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className={`btn btn-warning ${
            activeButton === "instructions" ? "active" : ""
          }`}
          onClick={() => setActiveButton("instructions")}
        >
          Instructions
        </button>
        <button
          className={`btn btn-warning ${
            activeButton === "ingredients" ? "active" : ""
          }`}
          onClick={() => setActiveButton("ingredients")}
        >
          Ingredients
        </button>
      </div>

      {activeButton === "instructions" && (
        <div className="mb-8 mt-8 m-12">
          <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
          <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
        </div>
      )}

      {activeButton === "ingredients" && (
        <div className="flex justify-center">
          <ul className="mb-8 mt-8">
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Recipe;
