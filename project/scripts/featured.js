import { setupNavigation, setupFooterDates } from './utils.mjs';

setupNavigation();
setupFooterDates();

const featuredContainer = document.querySelector('#featured-cards');

async function getFeaturedRecipes() {
  try {
    const response = await fetch('data/recipes.json');
    if (!response.ok) {
      throw new Error(`Failed to load recipes: ${response.status}`);
    }
    const data = await response.json();
    displayFeatured(data.recipes);
  } catch (error) {
    console.error(error);
    featuredContainer.innerHTML = '<p>Featured recipes could not be loaded right now.</p>';
  }
}

function displayFeatured(recipes) {
  const shuffled = recipes.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  featuredContainer.innerHTML = '';

  selected.forEach(recipe => {
    const card = document.createElement('article');
    card.classList.add('recipe-card');

    card.innerHTML = `
      <img src="images/${recipe.image}" alt="${recipe.name}" loading="lazy">
      <h3>${recipe.name}</h3>
      <p class="recipe-meta">${recipe.category} &middot; ${recipe.time} min</p>
      <span class="difficulty">${recipe.difficulty}</span>
    `;

    featuredContainer.appendChild(card);
  });
}

getFeaturedRecipes();