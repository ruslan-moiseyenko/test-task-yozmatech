// Recipe model
class Recipe {
  constructor(title, ingredients, instructions) {
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}
// Input validation
function validateInputs(title, ingredients, instructions) {
  //the validation is very basic so at least I'd check if any letters present, otherwise it is invalid
  //for that I'll use simple function with regexp
  const hasLetters = (str) => /[a-zA-Z]/.test(str);

  if (!hasLetters(title)) {
    return false;
  }

  // as we get an array in ingredients, we check it's length and the content
  if (
    !Array.isArray(ingredients) ||
    ingredients.length === 0 ||
    !ingredients.some((ing) => hasLetters(ing))
  ) {
    return false;
  }

  if (!hasLetters(instructions)) {
    return false;
  }
  return true;
}

// Handle form submission
const form = document.getElementById("recipe-form");

// prosed only if got anything in the form
if (form) {
  form.addEventListener("submit", (e) => {
    //as we want to change the default behavior we need to prevent it
    e.preventDefault();

    // Get data
    // check elements for availability and in case of "undefined" give them default value
    const title = form.elements["title"]?.value || "";
    const ingredients = form.elements["ingredients"]?.value?.split(",") || [];

    // Filter out blank items from ingredients array
    ingredients = ingredients.filter((ing) => ing.trim() !== "");

    const instructions = form.elements["instructions"]?.value || "";
    // Validate
    if (!validateInputs(title, ingredients, instructions)) {
      alert("Invalid recipe data");
      return;
    }

    // Create recipe object
    const recipe = new Recipe(title, ingredients, instructions);
    // POST to API
    saveRecipe(recipe)
      .then((res) => {
        console.log("Recipe saved!", res);
      })
      .catch((err) => {
        console.error("Save failed!", err);
      });
  });
} else {
  console.error("Form element not found in the DOM.");
}

// API post handler
async function saveRecipe(recipe) {
  // in order to handle errors we'll need to wrap async actions in try/catch
  try {
    const resp = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    });
    return resp.json();
  } catch (error) {
    console.error("Error saving recipe:", error.message);
  }
}
