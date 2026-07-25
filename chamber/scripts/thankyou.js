const params = new URLSearchParams(window.location.search);

document.querySelector('#display-first').textContent = params.get('first-name');
document.querySelector('#display-last').textContent = params.get('last-name');
document.querySelector('#display-email').textContent = params.get('email');
document.querySelector('#display-phone').textContent = params.get('phone');
document.querySelector('#display-org').textContent = params.get('organization');
document.querySelector('#display-timestamp').textContent = params.get('timestamp');