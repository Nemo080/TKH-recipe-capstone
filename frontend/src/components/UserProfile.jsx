import { useState, useEffect } from "react";
import axios from "axios";
import RecipeForm from "./CRUDRecipe"; // Adjust path as necessary

const UserProfile = () => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({ name: "User Name", pronouns: "Pronouns" });
  const [modal, setModal] = useState("");
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (userToken) {
          const response = await axios.get(
            "http://localhost:3000/users/user-profile",
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          setUser(response.data.user);
          setRecipes(response.data.recipes);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
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
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        const response = await axios.get(
          "http://localhost:3000/users/user-profile",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error("Error refreshing recipes:", error);
    }
  };

  const words = [
    { id: 0, value: "One day... I'm gonna make the onions cry." },
    { id: 1, value: "A recipe is a story that ends with a good meal." },
    { id: 2, value: "The secret ingredient is always love." },
  ];

  useEffect(() => {
    const startTimer = () => {
      if (timer) {
        clearInterval(timer); // Clear previous interval if it exists
      }
      const intervalId = setInterval(() => {
        goToNext();
      }, 9000); // Change word every 9 seconds

      setTimer(intervalId); // Store the interval ID in state
    };

    startTimer(); // Start the timer initially

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
        resetTimer();
      } else if (event.key === "ArrowRight") {
        goToNext();
        resetTimer();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(timer); // Clear interval when component unmounts
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]); // Restart timer when currentIndex changes
  const startTimer = () => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 9000); // Change word every 2 seconds

    setTimer(intervalId); // Store the interval ID in state
  };

  const resetTimer = () => {
    clearInterval(timer); // Clear the current interval
    startTimer(); // Restart the timer
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + words.length) % words.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return (
    <div className="bg-white min-h-screen p-8 text-black">
      <div className="relative flex items-center mb-8">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold">
          Your Recipes
        </h1>
        <div className="ml-auto">
          <button
            onClick={() => handleModal("create")}
            className="navsignup"
            style={{ backgroundColor: "#7FB685", fontFamily: "Montserrat" }}
          >
            Create Recipe
          </button>
        </div>
      </div>

      <div className="flex">
        {/* User Profile Card Section */}
        <div
          className="user-profile-card-container"
          style={{ height: "500px" }}
        >
          <div
            className="user-profile-card"
            style={{
              height: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="flex flex-col items-center p-4">
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full mt-8">
                  <img
                    src="/usericon.png"
                    alt="User Profile"
                    className=""
                  />
                </div>
              </div>
              <h2 className="font-bold text-black my-8 text-2xl">
                {user.name}
              </h2>
              <p style={{ fontFamily: "Montserrat" }}>{user.pronouns}</p>
              <button
                onClick={() => handleModal("create")}
                className="navsignup mb-4"
              >
                Create Recipe
              </button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => {
                  goToPrevious();
                  resetTimer();
                }}
                className="mx-4"
              >
                <img src="/leftArrow.png" className="w-12" />
              </button>
              <div className="mx-4 text-lg font-medium">
                "&nbsp;{words[currentIndex].value}&nbsp;"
              </div>
              <button
                onClick={() => {
                  goToNext();
                  resetTimer();
                }}
                className="mx-4"
              >
                <img src="/rightArrow.png" className="w-12" />
              </button>
            </div>
          </div>
        </div>

        {/* Recipe Grid Section */}
        <div className="recipe-grid-container ml-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {recipes.map((recipe) => (
      <div key={recipe.id} className="recipe-container">
        <div className="recipe-content">
          {/* <img src={recipe.image || 'https://via.placeholder.com/150'} alt={recipe.title} /> */}
          <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Montserrat" }}>
            {recipe.title}
          </h3>
          <div className="button-container mt-auto">
            <button
              onClick={() => handleModal("update", recipe)}
              className="btn btn-secondary"
              style={{ backgroundColor: "#7FB685", fontFamily: "Montserrat" }}
            >
              Update
            </button>
            <button
              onClick={() => handleModal("delete", recipe)}
              className="btn btn-error ml-2"
              style={{ backgroundColor: "#7FB685", fontFamily: "Montserrat" }}
            >
              Delete
            </button>
          </div>
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
          closeModal={() => setModal("")}
          refreshRecipes={refreshRecipes}
        />
      )}
    </div>
  );
};

export default UserProfile;
