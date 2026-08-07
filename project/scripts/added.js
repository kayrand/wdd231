import { setupNavigation, setupFooterDates } from './utils.mjs';

setupNavigation();
setupFooterDates();

const addedContainer = document.querySelector('#added-recipe');

const recipe = JSON.parse(localStorage.getItem('lastAddedRecipe'));

if (recipe) {
  const ingredientsList = recipe.ingredients.map(item => `<li>${item}</li>`).join('');
  const instructionsList = recipe.instructions.map(step => `<li>${step}</li>`).join('');

  addedContainer.innerHTML = `
    <h2>${recipe.name}</h2>
    <p class="added-meta">${recipe.category} &middot; ${recipe.difficulty} &middot; ${recipe.time} min &middot; Serves ${recipe.servings}</p>
    <h3>Ingredients</h3>
    <ul>${ingredientsList}</ul>
    <h3>Instructions</h3>
    <ol>${instructionsList}</ol>
  `;
} else {
  addedContainer.innerHTML = '<p>No recipe found. Please go back and add one.</p>';
}