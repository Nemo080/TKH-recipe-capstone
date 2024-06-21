import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React
import axios from 'axios'; // Importing axios for making HTTP requests
import 'tailwindcss/tailwind.css'; // Importing Tailwind CSS for styling
import 'daisyui/dist/full.css'; // Importing DaisyUI for additional styling

// RecipeForm component definition
const RecipeForm = ({ mode, recipe, closeModal, refreshRecipes }) => {
  // Define state variables using useState hook
  const [id, setId] = useState(''); // State for recipe ID
  const [title, setTitle] = useState(''); // State for recipe title
  const [ingredients, setIngredients] = useState(''); // State for recipe ingredients
  const [directions, setDirections] = useState(''); // State for recipe directions
  const [equipment, setEquipment] = useState(''); // State for recipe equipment
  const [message, setMessage] = useState(''); // State for feedback message

  // useEffect hook to populate form fields when editing a recipe
  useEffect(() => {
    if (recipe) {
      console.log("Setting recipe ID:", recipe.id); // Debug: Log recipe ID
      setId(recipe.id);
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setDirections(recipe.instructions);
      setEquipment(recipe.equipment);
    }
  }, [recipe]);

  // Function to handle creating a new recipe
  const handleCreate = async () => {
    try {
      const formData = {
        title,
        ingredients,
        equipment,
        instructions: directions,
      };

      console.log("Creating recipe with data:", formData); // Debug: Log form data
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:3000/users/user-profile', formData, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      if (response.status === 201) {
        refreshRecipes();
        closeModal();
      }
    } catch (error) {
      console.error('Error creating recipe:', error.response);
      setMessage('Failed to create recipe');
    }
  };

  // Function to handle updating an existing recipe
  const handleUpdate = async () => {
    try {
      const formData = {
        title,
        ingredients,
        equipment,
        instructions: directions,
      };

      console.log("Updating recipe with ID:", id); // Debug: Log recipe ID
      console.log("Updating recipe with data:", formData); // Debug: Log form data
      const userToken = localStorage.getItem('userToken');
      const response = await axios.put(`http://localhost:3000/users/user-profile/${id}`, formData, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      if (response.status === 200) {
        setMessage('Recipe updated successfully!');
        refreshRecipes();
        closeModal();
      }
    } catch (error) {
      console.error('Error updating recipe:', error.response);
      setMessage('Failed to update recipe');
    }
  };

  // Function to handle deleting an existing recipe
  const handleDelete = async () => {
    try {
      console.log("Deleting recipe with ID:", id); // Debug: Log recipe ID
      const userToken = localStorage.getItem('userToken');
      const response = await axios.delete(`http://localhost:3000/users/user-profile/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      if (response.status === 200) {
        setMessage('Recipe deleted successfully!');
        refreshRecipes();
        closeModal();
      }
    } catch (error) {
      console.error('Error deleting recipe:', error.response);
      setMessage('Failed to delete recipe');
    }
  };

  // Function to handle form submission based on mode
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'create') {
      handleCreate();
    } else if (mode === 'update') {
      handleUpdate();
    } else if (mode === 'delete') {
      handleDelete();
    }
  };

  const inputClass = "input input-bordered input-green text-black placeholder-opacity-30"; // Class for input styling

  // JSX to render the form
  return (
    <div className="modal modal-open">
      <div className="modal-box" style={{ fontFamily: 'Quicksand' }}>
        <h3 className="font-bold text-lg">{mode.charAt(0).toUpperCase() + mode.slice(1)} Recipe</h3>
        <form onSubmit={handleSubmit}>
          {mode !== 'delete' && (
            <div className="form-control">
              <label className="label">Title:</label>
              <input type="text" className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
          )}
          {mode !== 'delete' && (
            <>
              <div className="form-control">
                <label className="label">Ingredients:</label>
                <textarea className={inputClass} value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Equipment:</label>
                <textarea className={inputClass} value={equipment} onChange={(e) => setEquipment(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Directions:</label>
                <textarea className={inputClass} value={directions} onChange={(e) => setDirections(e.target.value)} required />
              </div>
            </>
          )}
          <div className="modal-action">
            <button type="submit" className={`btn ${mode === 'delete' ? 'btn-error' : 'btn-primary'}`} style={{ backgroundColor: '#7FB685' }}>
              {mode === 'delete' ? 'Delete' : 'Save'}
            </button>
            <button type="button" className="btn" onClick={closeModal}>Cancel</button>
          </div>
        </form>
        {message && (
          <div className="alert alert-success mt-4">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;
