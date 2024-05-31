import { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const RecipeForm = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState('');
  const [equipment, setEquipment] = useState('');
  const [modal, setModal] = useState('');

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
      setModal('');
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
      setModal('');
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
      setModal('');
    } catch (err) {
      console.error('Error response:', err.response);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recipe Form</h2>
      <div className="flex space-x-4 mb-4">
        <button className="btn btn-primary" onClick={() => setModal('create')}>Create Recipe</button>
        <button className="btn btn-secondary" onClick={() => setModal('update')}>Update Recipe</button>
        <button className="btn btn-error" onClick={() => setModal('delete')}>Delete Recipe</button>
      </div>

      {/* Create Recipe Modal */}
      {modal === 'create' && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create Recipe</h3>
            <form onSubmit={handleCreate}>
              <div className="form-control">
                <label className="label">Title:</label>
                <input type="text" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Ingredients:</label>
                <textarea className="textarea textarea-bordered" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Equipment:</label>
                <textarea className="textarea textarea-bordered" value={equipment} onChange={(e) => setEquipment(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Directions:</label>
                <textarea className="textarea textarea-bordered" value={directions} onChange={(e) => setDirections(e.target.value)} required />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={() => setModal('')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Recipe Modal */}
      {modal === 'update' && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Recipe</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control">
                <label className="label">Recipe ID:</label>
                <input type="text" className="input input-bordered" value={id} onChange={(e) => setId(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Title:</label>
                <input type="text" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Ingredients:</label>
                <textarea className="textarea textarea-bordered" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Equipment:</label>
                <textarea className="textarea textarea-bordered" value={equipment} onChange={(e) => setEquipment(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">Directions:</label>
                <textarea className="textarea textarea-bordered" value={directions} onChange={(e) => setDirections(e.target.value)} required />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn" onClick={() => setModal('')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Recipe Modal */}
      {modal === 'delete' && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Recipe</h3>
            <form onSubmit={handleDelete}>
              <div className="form-control">
                <label className="label">Recipe ID:</label>
                <input type="text" className="input input-bordered" value={id} onChange={(e) => setId(e.target.value)} required />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-error">Delete</button>
                <button type="button" className="btn" onClick={() => setModal('')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
