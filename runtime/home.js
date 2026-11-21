const appointmentDialog = document.querySelector('#appointment-dialog');

document.querySelectorAll('[data-open-appointment]').forEach((button) => {
  button.addEventListener('click', () => appointmentDialog.showModal());
});

document.querySelector('#appointment-request').addEventListener('submit', (event) => {
  event.preventDefault();
});
