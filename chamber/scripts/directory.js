const membersContainer = document.querySelector('#members');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

const levels = {
  1: 'Bronze',
  2: 'Silver',
  3: 'Gold'
};

async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('section');

    card.innerHTML = `
      <div class="card-top"></div>
      <h2>${member.name}</h2>
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <span class="level ${levels[member.membershipLevel].toLowerCase()}">${levels[member.membershipLevel]} Member</span>
    `;

    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
  gridButton.classList.add('active');
  listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
  listButton.classList.add('active');
  gridButton.classList.remove('active');
});

getMembers();