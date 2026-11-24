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

const hero = document.querySelector('.home-hero-layout');
const heroCopy = hero.querySelector('.home-hero-copy');
const heroValues = heroCopy.querySelector('.home-hero-values');
const heroButton = heroCopy.querySelector('.hero-appointment');
const heroText = heroCopy.querySelectorAll('h1, p');
const desktopHero = window.matchMedia('(min-width: 768px) and (min-height: 501px), (min-width: 768px) and (pointer: fine)');
const watermarkRatio = 1484 / 1408;

function fitHeroWatermark() {
  if (!desktopHero.matches) {
    hero.style.removeProperty('--hero-watermark-size');
    hero.style.removeProperty('--hero-watermark-position');
    return;
  }

  const bounds = hero.getBoundingClientRect();
  const copy = heroCopy.getBoundingClientRect();
  const range = document.createRange();
  let left = heroButton.getBoundingClientRect().right;
  for (const element of heroText) {
    range.selectNodeContents(element);
    left = Math.max(left, range.getBoundingClientRect().right);
  }

  left += 12;
  const right = heroValues.getBoundingClientRect().left - 12;
  const width = Math.max(0, Math.min(right - left, copy.width * 0.45, bounds.height * 0.65 * watermarkRatio));
  const height = width / watermarkRatio;
  const preferredLeft = copy.left + copy.width * 0.575 - width / 2;
  const x = Math.max(left, Math.min(preferredLeft, right - width)) - bounds.left;
  const y = Math.max(0, bounds.height * 0.408 - height / 2);

  hero.style.setProperty('--hero-watermark-size', width + 'px auto');
  hero.style.setProperty('--hero-watermark-position', x + 'px ' + y + 'px');
}

fitHeroWatermark();
window.addEventListener('resize', fitHeroWatermark);
document.fonts?.ready.then(fitHeroWatermark);

if ('ResizeObserver' in window) {
  const heroObserver = new ResizeObserver(fitHeroWatermark);
  [hero, heroCopy, heroValues, heroButton].forEach((element) => heroObserver.observe(element));
}
