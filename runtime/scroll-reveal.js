const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reducedMotion.matches && 'IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
  const observer = new IntersectionObserver((entries) => {
    const groupCounts = new Map();
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (reducedMotion.matches) continue;

      const group = target.closest('.expertise-grid, .practice-benefits, #blogs, .faq-grid');
      const index = group ? (groupCounts.get(group) ?? 0) : 0;
      if (group) groupCounts.set(group, index + 1);

      target.animate(
        [{ opacity: 0.55, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 460, delay: Math.min(index, 3) * 55, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'backwards' }
      );
    }
  }, { rootMargin: '0px 0px -8% 0px' });

  const targets = document.querySelectorAll(
    'main h1, main h2, main article, main .team-portrait img, main .team-biography, ' +
    'main [data-editorial-reveal], main details, main .practice-benefits > div, main form'
  );
  targets.forEach((target) => {
    if (!target.closest('#hero') && !target.parentElement.closest('main article, main details, main form')) {
      observer.observe(target);
    }
  });
}
