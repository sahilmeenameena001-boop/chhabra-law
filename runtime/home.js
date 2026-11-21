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

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      entry.target.animate(
        [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 520, easing: 'cubic-bezier(.2,.7,.3,1)' }
      );
    }
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-editorial-reveal], main > section > .home-information-heading').forEach((element) => reveal.observe(element));
}
