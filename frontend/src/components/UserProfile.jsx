import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeForm from './CRUDRecipe'; // Adjust path as necessary


const UserProfile = () => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({ name: 'User Name', pronouns: 'Pronouns' });
  const [modal, setModal] = useState('');
  const [currentRecipe, setCurrentRecipe] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
          const response = await axios.get('http://localhost:3000/users/user-profile', {
            headers: { Authorization: `Bearer ${userToken}` }
          });
          setUser(response.data.user);
          setRecipes(response.data.recipes);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleModal = (mode, recipe = null) => {
    setModal(mode);
    setCurrentRecipe(recipe);
  };

  const refreshRecipes = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const response = await axios.get('http://localhost:3000/users/user-profile', {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error('Error refreshing recipes:', error);
    }
  };

  return (
    <div className="bg-white min-h-screen p-8 text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Quicksand', color: '#FF7043' }}>Your Recipes</h1>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Quicksand', color: '#FF7043' }}>Recipe Form</h1>
        <div className="flex space-x-4">
          <button onClick={() => handleModal('create')} className="btn btn-primary" style={{ backgroundColor: '#7FB685', fontFamily: 'Montserrat' }}>Create Recipe</button>
        </div>
      </div>

      <div className="flex">
        {/* User Profile Card Section */}
        <div className="user-profile-card-container">
          <div className="user-profile-card">
            <div className="flex flex-col items-center p-4">
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://via.placeholder.com/150" alt="User Profile" />
                </div>
              </div>
              <h2 className="font-bold" style={{ fontFamily: 'Quicksand', color: '#FF7043' }}>{user.name}</h2>
              <p style={{ fontFamily: 'Montserrat' }}>{user.pronouns}</p>
              <button className="btn btn-outline mt-4" style={{ borderColor: '#7FB685', color: '#7FB685', fontFamily: 'Montserrat' }}>Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Recipe Grid Section */}
        <div className="recipe-grid-container">
          <div className="grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-container">
                <div className="recipe-content">
                 {/* <img src={recipe.image || 'https://via.placeholder.com/150'} alt={recipe.title} /> */}
                  <h3 className="text-xl font-bold mt-4" style={{ fontFamily: 'Quicksand', color: '#FF7043' }}>{recipe.title}</h3>
                  <button onClick={() => handleModal('update', recipe)} className="btn btn-secondary mt-4" style={{ backgroundColor: '#7FB685', fontFamily: 'Montserrat' }}>Update Recipe</button>
                  <button onClick={() => handleModal('delete', recipe)} className="btn btn-error mt-2" style={{ backgroundColor: '#7FB685', fontFamily: 'Montserrat' }}>Delete Recipe</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Recipe Form */}
      {modal && (
        <RecipeForm
          mode={modal}
          recipe={currentRecipe}
          closeModal={() => setModal('')}
          refreshRecipes={refreshRecipes}
        />
      )}
    </div>
  );
};

export default UserProfile;
