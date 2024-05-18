// Recipe API client
class RecipeApi {
  constructor() {
    // here we can also cache resent recipes
    this.cache = {};
  }
  async getRecentRecipes() {
    // Build URL with filters

    //here we can check if the result already cached
    const url = new URL("/api/v2/recipes/latest");
    url.searchParams.set("limit", "12");

    // Fetch

    const response = await fetch(url);
    //here we can cache the response
    return await response.json();
  }

  async searchRecipes(query) {
    // Build Search URL
    const url = new URL("/api/v2/recipes");
    url.searchParams.set("search", query);

    // Fetch results
    const response = await fetch(url);
    return response.json();
  }

  async getRecipeDetails(id) {
    // Check cache
    if (this.cache[id]) {
      return this.cache[id];
    }
    // Fetch from API
    const url = `/api/v2/recipes/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    // Store to cache
    this.cache[id] = json;
    return json;
  }
}

// UI Rendering
class RecipeRenderer {
  constructor() {
    // here is no check if we got "recipe-list" element and it can lead to errors
    this.recipesElement = document.getElementById("recipe-list");
  }
  showRecipes(recipes) {
    // it is better to make DOM update just once
    //for that we'll need to gather all the elements
    // and insert them at once
    let recipeHTML = "";

    recipes.forEach((recipe) => {
      recipeHTML = `
              <div class="recipe">
              <h2>${recipe.name}</h2>
              <p>${recipe.description}</p>
              </div>
              `;
    });

    this.recipesElement.insertAdjacentHTML("beforeend", recipeHTML);
  }

  showLoader() {
    // TODO
  }
  showError() {
    // TODO
  }
}
// Bring it together
const api = new RecipeApi();
const renderer = new RecipeRenderer();
async function loadRecipes() {
  try {
    renderer.showLoader();
    const recipes = await api.getRecentRecipes();
    renderer.showRecipes(recipes);
  } catch (err) {
    renderer.showError();
  }
}
loadRecipes();
