const appointmentDialog = document.querySelector('#appointment-dialog');

document.querySelectorAll('[data-open-appointment]').forEach((button) => {
  button.addEventListener('click', () => appointmentDialog.showModal());
});

document.querySelectorAll('[data-email-request]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const lines = [];
    for (const [name, value] of new FormData(form)) {
      if (!value.trim()) continue;
      const label = form.elements.namedItem(name).labels[0].firstChild.textContent.trim();
      lines.push(label + ': ' + value.trim());
    }

    const subject = encodeURIComponent(form.dataset.subject);
    const body = encodeURIComponent(lines.join('\r\n'));
    window.location.href = 'mailto:' + form.dataset.emailRequest + '?subject=' + subject + '&body=' + body;
  });
  form.querySelector('[type=submit]').disabled = false;
});
