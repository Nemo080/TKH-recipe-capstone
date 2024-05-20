import { useState } from 'react';
import axios from "axios";

const CreateRecipe = () => {
  // State variables to hold form data and error message
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send form data to backend to create a new recipe
    // http://localhost:3000/auth/recipes
    axios.post("http://localhost:3000/auth/login", { title, ingredients, directions })
      .then(result => {
        console.log(result);
        // Clear form fields on successful submission
        setTitle('');
        setIngredients('');
        setDirections('');
        setError('');
        // Optionally, redirect or show success message
        // navigate("/recipes") or show success message
      })
      .catch(err => {
        console.error(err);
        setError('Failed to create recipe');
      });
  };

  return (
    <div>
      {/* Create Recipe form */}
      <h2>Create Recipe</h2>
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Form with input fields for title, ingredients, and directions */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          {/* Input field for title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          {/* Textarea for ingredients */}
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Directions:</label>
          {/* Textarea for directions */}
          <textarea
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            required
          />
        </div>
        {/* Submit button */}
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
