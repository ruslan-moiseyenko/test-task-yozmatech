# test-task-yozmatech
 

Created by  Julian Rassolov
Created time
Tags
Task 1:
The Scenario:
You're working at a startup building a web application for users to share cooking
recipes. The engineering team has put together a first version of the code for the recipe
submission form, but users have reported bugs when trying to submit new recipes.
Your Task:
Review the provided code for the recipe submission form logic and identify any bugs or
issues that could be causing it to not function properly. Specifically:
1. Analyze the JavaScript code related to the form validation, data processing, and API
calls for submitting the recipes.
2. Identify any potential errors, edge cases not handled properly, inconsistencies, or
general issues that could lead to bugs.
3. Comment directly in the code file detailing any issues you find and suggestions for
fixing them.
4. Summarize the key problems identified and your approach to addressing them in a
text file called FINDINGS.md
Guidelines:
Focus your analysis on the JavaScript code only
Comment code inline with // or /* */ to explain issues spotted and suggested fixes
Code should run properly with latest Chrome browser
Use best practices and optimize for code quality as well as functionality
What we're looking for:
@December 10, 2023 3:01 PMJS HA 2
Attention to detail catching bugs
Identifying edge cases
Clear documentation of issues
Suggested solutions
The Code File:
/* Code provided bellow contains:
Recipe model
Submit form validation functions
POST handler sending data to API
Event handlers
*/
Let me know if you would like me to provide an actual code sample with bugs for a
candidate to analyze as part of this home assignment. I can generate snippets
demonstrating issues for them to identify and fix. Please advise if any part of this home
assignment could be improved or clarified.
// Recipe model
class Recipe {
constructor(title, ingredients, instructions) {
this.title = title;
this.ingredients = ingredients;
this.instructions = instructions;
}
} /
/ Input validation
function validateInputs(title, ingredients, instructions) {
if(!title) {
return false;
} i
f(!ingredients) {
return false;
} i
f(!instructions) {
return false;JS HA 3
} r
eturn true;
} /
/ Handle form submission
const form = document.getElementById('recipe-form');
form.addEventListener('submit', (e) => {
// Get data
const title = form.elements['title'].value;
const ingredients = form.elements['ingredients'].value.split(',');
const instructions = form.elements['instructions'].value;
// Validate
if(!validateInputs(title, ingredients, instructions)) {
alert('Invalid recipe data');
return;
} /
/ Create recipe object
const recipe = new Recipe(title, ingredients, instructions);
// POST to API
saveRecipe(recipe)
.then(res => {
console.log('Recipe saved!', res);
})
.catch(err => {
console.error('Save failed!', err);
});
});
// API post handler
async function saveRecipe(recipe) {
const resp = await fetch('/api/recipes', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(recipe)
});
return resp.json();
}JS HA 4
Task 2:
The Scenario:
The recipe application has become quite popular and traffic has grown significantly.
Initial testing indicates page load times are slow, especially on the recipe listing and
recipe detail pages.
Your Task:
Review the provided code for the recipe listing logic and detail page handlers. Identify
opportunities to optimize the code for faster page loads and better performance.
Specifically:
1. Analyze the JavaScript powering the recipe listings page and review network
performance.
2. Identify any network requests, algorithms, DOM manipulations or other operations
that can be optimized.
3. Outline approach for refactoring code to improve performance. Comment
recommendations directly in the code file.
4. Summarize key opportunities for optimization and the expected performance
improvements from addressing those in a text file called PERFORMANCE.md
Guidelines:
Focus analysis on network requests, page load times, and scalability
Comment code inline explaining issues identified and suggested changes
Implement 1-2 of your recommendations and measure performance gains
Use latest best practices for high-traffic web apps
What we're looking for:
In-depth performance analysis
Identifying bottlenecks
Quantifying expected gains
Clean implementation improving metricsJS HA 5
You may provide us with a code sample to analyze or simply describe the type of
functions and pages you would expect a candidate to optimize, along with some
guidelines on the performance goals. Please let me know if you would like any
clarification or have additional requirements for this home assignment.
// Recipe API client
class RecipeApi {
constructor() {
this.cache = {};
} a
sync getRecentRecipes() {
// Build URL with filters
const url = new URL('/api/v2/recipes/latest');
url.searchParams.set('limit', '12');
// Fetch
const response = await fetch(url);
return await response.json();
} a
sync searchRecipes(query) {
// Build Search URL
const url = new URL('/api/v2/recipes');
url.searchParams.set('search', query);
// Fetch results
const response = await fetch(url);
return response.json();
} a
sync getRecipeDetails(id) {
// Check cache
if (this.cache[id]) {
return this.cache[id];
} /
/ Fetch from API
const url = `/api/v2/recipes/${id}`;
const response = await fetch(url);
const json = await response.json();
// Store to cacheJS HA 6
this.cache[id] = json;
return json;
}
} /
/ UI Rendering
class RecipeRenderer {
constructor() {
this.recipesElement = document.getElementById("recipe-list");
} s
howRecipes(recipes) {
recipes.forEach(recipe => {
const recipeHTML = `
<div class="recipe">
<h2>${recipe.name}</h2>
<p>${recipe.description}</p>
</div>
`;
this.recipesElement.insertAdjacentHTML('beforeend', recipeHTML);
});
} s
howLoader() {
// TODO
} s
howError() {
// TODO
}
} /
/ Bring it together
const api = new RecipeApi();
const renderer = new RecipeRenderer();
async function loadRecipes() {
try {
renderer.showLoader();
const recipes = await api.getRecentRecipes();JS HA 7
renderer.showRecipes(recipes);
} catch (err) {
renderer.showError();
}
} loadRecipes();