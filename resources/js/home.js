import { annotate } from 'rough-notation';

const applyChalkFilterToNotation = () => {
  document.querySelectorAll('.rough-notation-holder svg').forEach(svg => {
    svg.classList.add('chalk-texture');
  });
};

window.addEventListener('load', () => {
  setTimeout(() => {
    const ctaContainer = document.querySelector('#cta-container');
    if (ctaContainer) ctaContainer.classList.remove('opacity-0');

    // Double Chalk Underline for Motto
    const leuze = document.querySelector('#leuze-text');
    if (leuze) {
      const aLeuze = annotate(leuze, {
        type: 'underline',
        color: '#fef08a',
        strokeWidth: 2,
        iterations: 2,
        animationDuration: 1200
      });
      aLeuze.show();
    }

    // Rough annotations for action buttons
    const btnLid = document.querySelector('#btn-lid');
    if (btnLid) {
      const a1 = annotate(btnLid, {
        type: 'box',
        color: '#fef08a',
        strokeWidth: 2,
        padding: 6,
        animationDuration: 1200
      });
      a1.show();
    }

    const btnEvents = document.querySelector('#btn-events');
    if (btnEvents) {
      const a2 = annotate(btnEvents, {
        type: 'rectangle',
        color: '#ffffff',
        strokeWidth: 1.5,
        padding: 6,
        animationDuration: 1400
      });
      a2.show();
    }

    setTimeout(applyChalkFilterToNotation, 50);
  }, 150);
});

// Global function for popup toggle
window.toggleStickyNote = function() {
  const sticky = document.getElementById('sticky-note');
  if (sticky) {
    sticky.classList.toggle('hidden');
  }
};
