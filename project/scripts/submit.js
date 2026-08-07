import { setupNavigation, setupFooterDates } from './utils.mjs';

setupNavigation();
setupFooterDates();

const form = document.querySelector('#recipe-form');
const savedList = document.querySelector('#saved-list');

function displaySavedRecipes() {
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

  if (savedRecipes.length === 0) {
    savedList.innerHTML = '<p>You haven\'t added any recipes yet.</p>';
    return;
  }

  savedList.innerHTML = '';
  savedRecipes.forEach(recipe => {
    const item = document.createElement('div');
    item.classList.add('saved-item');
    item.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>${recipe.category} &middot; ${recipe.time} min</p>
    `;
    savedList.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const recipe = {
    name: formData.get('name'),
    category: formData.get('category'),
    difficulty: formData.get('difficulty'),
    time: formData.get('time'),
    servings: formData.get('servings'),
    ingredients: formData.get('ingredients').split('\n').filter(line => line.trim() !== ''),
    instructions: formData.get('instructions').split('\n').filter(line => line.trim() !== '')
  };

  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  savedRecipes.push(recipe);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));

  localStorage.setItem('lastAddedRecipe', JSON.stringify(recipe));

  window.location.href = 'recipe-added.html';
});

displaySavedRecipes();