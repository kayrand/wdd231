const timestampField = document.querySelector('#timestamp');
timestampField.value = new Date().toLocaleString();

const modalLinks = document.querySelectorAll('[data-modal]');

modalLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const modalId = link.getAttribute('data-modal');
    const modal = document.querySelector(`#${modalId}`);
    modal.showModal();
  });
});

const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.closest('dialog').close();
  });
});