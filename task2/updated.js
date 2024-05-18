// Recipe API client
class RecipeApi {
  constructor() {
    this.cache = {};
  }

  async getRecentRecipes() {
    // Build URL with filters
    const url = new URL("/api/v2/recipes/latest");
    url.searchParams.set("limit", "12");

    // Fetch recent recipes
    // Consider using caching mechanism to reduce network requests
    // Implement caching on the client-side to store fetched recipes
    // try-catch block for error handling
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch recent recipes", error);
      return []; // Return empty array on failure
    }
    // Consider using pagination for large datasets
  }

  async searchRecipes(query) {
    // Build Search URL
    const url = new URL("/api/v2/recipes");
    url.searchParams.set("search", query);

    // Fetch recipes based on search query
    // Implement caching on the client-side to reduce network requests
  }

  async getRecipeDetails(id) {
    // Check cache for recipe details
    if (this.cache[id]) {
      return this.cache[id];
    }

    // Fetch recipe details from API
    try {
      const url = `/api/v2/recipes/${id}`;
      const response = await fetch(url);
      const json = await response.json();

      // Cache the response for future use
      this.cache[id] = json;
      return json;
    } catch (error) {
      console.error(`Failed to fetch details for recipe ${id}`, error);
      return null; // Return null on failure
    }
  }
}

// UI Rendering
class RecipeRenderer {
  constructor() {
    this.recipesElement = document.getElementById("recipe-list");
  }

  showRecipes(recipes) {
    // Use document fragment for batch insertion
    const fragment = document.createDocumentFragment();

    recipes.forEach((recipe) => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe");
      recipeElement.innerHTML = `
                <h2>${recipe.name}</h2>
                <p>${recipe.description}</p>
            `;
      fragment.appendChild(recipeElement);
    });

    this.recipesElement.appendChild(fragment); // Batch insertion
  }

  showLoader() {
    // Implement loader display logic
    // const loader = document.createElement('div');
    // loader.className = 'loader';
    // this.recipesElement.appendChild(loader);
  }

  showError() {
    // Implement error display logic
    // const error = document.createElement('div');
    // error.className = 'error';
    // error.innerText = 'Failed to load recipes';
    // this.recipesElement.appendChild(error);
  }
}

// Bring it together
const api = new RecipeApi();
const renderer = new RecipeRenderer();

async function loadRecipes() {
  try {
    renderer.showLoader(); // Show loader while recipes are being fetched
    const recipes = await api.getRecentRecipes(); // Fetch recent recipes
    renderer.showRecipes(recipes); // Display fetched recipes
  } catch (err) {
    renderer.showError(); // Show error message if fetching fails
  }
}

loadRecipes(); // Load recipes when the page loads
