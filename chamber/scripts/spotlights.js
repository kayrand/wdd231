const spotlightContainer = document.querySelector('#spotlight-cards');

const spotlightLevels = {
  2: 'Silver',
  3: 'Gold'
};

async function getSpotlights() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displaySpotlights(data.members);
}

function displaySpotlights(members) {
  const qualified = members.filter(member => member.membershipLevel >= 2);

  const shuffled = qualified.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  spotlightContainer.innerHTML = '';

  selected.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <span class="level ${spotlightLevels[member.membershipLevel].toLowerCase()}">${spotlightLevels[member.membershipLevel]} Member</span>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();