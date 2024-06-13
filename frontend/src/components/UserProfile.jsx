import { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import RecipeForm from './CRUDRecipe';

const UserProfile = () => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({ name: 'User Name', pronouns: 'Pronouns' });
  const [profileImg, setProfileImg] = useState('https://via.placeholder.com/150');
  const [modal, setModal] = useState('');
  const [currentRecipe, setCurrentRecipe] = useState(null);

  useEffect(() => {
    // Fetch user data and recipes
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      axios.get('http://localhost:3000/user-profile', {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(response => {
        setUser(response.data.user);
        setRecipes(response.data.recipes);
      })
      .catch(error => console.log(error));
    }
  }, []);

  const handleModal = (mode, recipe) => {
    setModal(mode);
    setCurrentRecipe(recipe || null);
  };

  return (
    <div className="bg-white dark:bg-[#1C2530] min-h-screen p-8 text-black dark:text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Quicksand', color: '#FF7043' }}>Your Recipes</h1>
        <button onClick={() => handleModal('create')} className="btn btn-primary" style={{ backgroundColor: '#7FB685', fontFamily: 'Montserrat' }}>Create</button>
      </div>
      
      <div className="flex">
        <div className="user-profile-card-container">
          <div className="user-profile-card">
            <div className="flex flex-col items-center p-4">
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={profileImg} alt="User Profile" />
                </div>
              </div>
              <h2 className="font-bold" style={{ fontFamily: 'Quicksand', color: '#FF7043' }}>{user.name}</h2>
              <p style={{ fontFamily: 'Montserrat' }}>{user.pronouns}</p>
              <button className="btn btn-outline mt-4" style={{ borderColor: '#7FB685', color: '#7FB685', fontFamily: 'Montserrat' }}>Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="recipe-grid-container">
          <div className="grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-container">
                <div className="recipe-content">
                  <img src={recipe.image || 'https://via.placeholder.com/150'} alt={recipe.title} />
                  <h3 className="text-xl font-bold mt-4" style={{ fontFamily: 'Quicksand', color: '#FF7043' }}>{recipe.title}</h3>
                  <button onClick={() => handleModal('update', recipe)} className="btn btn-secondary mt-4" style={{ backgroundColor: '#7FB685', fontFamily: 'Montserrat' }}>Update</button>
                  <button onClick={() => handleModal('delete', recipe)} className="btn btn-error mt-2" style={{ backgroundColor: '#7FB685', fontFamily: 'Montserrat' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <RecipeForm
          mode={modal}
          recipe={currentRecipe}
          closeModal={() => setModal('')}
          refreshRecipes={() => {
            // Fetch updated recipes
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
              axios.get('http://localhost:3000/user-profile', {
                headers: { Authorization: `Bearer ${userToken}` }
              })
              .then(response => setRecipes(response.data.recipes))
              .catch(error => console.log(error));
            }
          }}
        />
      )}
    </div>
  );
};

export default UserProfile;
