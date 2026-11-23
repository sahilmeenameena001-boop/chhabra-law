const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (reducedMotion.matches) continue;

      target.animate(
        [{ opacity: 0.55, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 460, easing: 'cubic-bezier(.2,.7,.3,1)' }
      );
    }
  }, { rootMargin: '0px 0px -8% 0px' });

  if (!reducedMotion.matches) {
    const targets = document.querySelectorAll(
      'main h1, main h2, main article, main .team-portrait, main .team-layout > p, ' +
      'main [data-editorial-reveal], main details, main .practice-benefits > div, main form'
    );
    targets.forEach((target) => {
      if (!target.closest('#hero') && !target.parentElement.closest('main article, main details, main form')) {
        observer.observe(target);
      }
    });

  }
}
