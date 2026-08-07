export function setupNavigation() {
  const menuButton = document.querySelector('#menu-toggle');
  const navMenu = document.querySelector('#nav-menu');

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }
}

export function setupFooterDates() {
  const yearSpan = document.querySelector('#year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const lastModified = document.querySelector('#lastModified');
  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }
}