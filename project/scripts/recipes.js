import { setupNavigation, setupFooterDates } from './utils.mjs';

setupNavigation();
setupFooterDates();

const recipeContainer = document.querySelector('#recipe-cards');
const categoryFilter = document.querySelector('#category-filter');
const modal = document.querySelector('#recipe-modal');
const modalContent = document.querySelector('#modal-content');
const closeModalButton = document.querySelector('#close-modal');

let allRecipes = [];
let myRecipes = [];

async function getRecipes() {
  try {
    const response = await fetch('data/recipes.json');
    if (!response.ok) {
      throw new Error(`Failed to load recipes: ${response.status}`);
    }
    const data = await response.json();
    allRecipes = data.recipes;

    loadMyRecipes();
    displayRecipes(allRecipes);
  } catch (error) {
    console.error(error);
    recipeContainer.innerHTML = '<p class="no-recipes">Sorry, the recipes could not be loaded. Please try again later.</p>';
  }
}

function loadMyRecipes() {
  const saved = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  myRecipes = saved.map((recipe, index) => ({
    ...recipe,
    id: 1000 + index,
    image: recipe.image || 'logo.svg'
  }));
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = '';

  if (recipes.length === 0) {
    recipeContainer.innerHTML = '<p class="no-recipes">No recipes to show yet. Add your own on the Share a Recipe page!</p>';
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement('article');
    card.classList.add('recipe-card');

    card.innerHTML = `
      <img src="images/${recipe.image}" alt="${recipe.name}" loading="lazy">
      <h3>${recipe.name}</h3>
      <p class="recipe-meta">${recipe.category} &middot; ${recipe.time} min</p>
      <span class="difficulty">${recipe.difficulty}</span>
      <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>
    `;

    recipeContainer.appendChild(card);
  });

  const viewButtons = document.querySelectorAll('.view-recipe');
  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-id'));
      openModal(id);
    });
  });
}

function openModal(id) {
  const recipe = allRecipes.find(r => r.id === id) || myRecipes.find(r => r.id === id);

  const ingredientsList = recipe.ingredients.map(item => `<li>${item}</li>`).join('');
  const instructionsList = recipe.instructions.map(step => `<li>${step}</li>`).join('');

  modalContent.innerHTML = `
    <img src="images/${recipe.image}" alt="${recipe.name}" class="modal-img">
    <h2>${recipe.name}</h2>
    <p class="modal-meta">${recipe.category} &middot; ${recipe.difficulty} &middot; ${recipe.time} min &middot; Serves ${recipe.servings}</p>
    <h3>Ingredients</h3>
    <ul>${ingredientsList}</ul>
    <h3>Instructions</h3>
    <ol>${instructionsList}</ol>
  `;

  modal.showModal();
}

categoryFilter.addEventListener('change', () => {
  const selected = categoryFilter.value;

  if (selected === 'all') {
    displayRecipes(allRecipes);
  } else if (selected === 'my-recipes') {
    displayRecipes(myRecipes);
  } else {
    const filtered = allRecipes.filter(recipe => recipe.category === selected);
    displayRecipes(filtered);
  }
});

closeModalButton.addEventListener('click', () => {
  modal.close();
});

getRecipes();