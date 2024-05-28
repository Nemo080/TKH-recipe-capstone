import { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState('');
  const [equipment, setEquipment] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/recipes/new-recipe', {
        title,
        ingredients,
        instructions: directions,
        equipment
      });

      console.log(response.data);

      setTitle('');
      setIngredients('');
      setDirections('');
      setEquipment('');
    } catch (err) {
      console.error('Error response:', err.response);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/recipes/${id}`, {
        title,
        ingredients,
        instructions: directions,
        equipment
      });

      console.log(response.data);

      setId('');
      setTitle('');
      setIngredients('');
      setDirections('');
      setEquipment('');
    } catch (err) {
      console.error('Error response:', err.response);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:3000/recipes/${id}`);

      console.log(response.data);

      setId('');
    } catch (err) {
      console.error('Error response:', err.response);
    }
  };

  return (
    <div>
      <h2>Recipe Form</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>ID (for update/delete):</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Equipment:</label>
          <textarea
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Directions:</label>
          <textarea
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Recipe</button>
        <button type="button" onClick={handleUpdate}>Update Recipe</button>
        <button type="button" onClick={handleDelete}>Delete Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
