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

    // Double Chalk Underline voor Motto
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

    // Rough annotations voor Hero knoppen
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

    // Rough annotations voor Content Section links
    const btnOverOns = document.querySelector('#btn-over-ons');
    if (btnOverOns) {
      const a3 = annotate(btnOverOns, {
        type: 'underline',
        color: '#991b1b',
        strokeWidth: 1.5,
        animationDuration: 1000
      });
      a3.show();
    }

    const btnAgenda = document.querySelector('#btn-agenda');
    if (btnAgenda) {
      const a4 = annotate(btnAgenda, {
        type: 'underline',
        color: '#075985',
        strokeWidth: 1.5,
        animationDuration: 1000
      });
      a4.show();
    }

    // Rough annotations (Boxes) voor Social Knoppen
    const btnInsta = document.querySelector('#btn-insta');
    if (btnInsta) {
      const aInsta = annotate(btnInsta, {
        type: 'box',
        color: '#db2777',
        strokeWidth: 1.5,
        padding: 4,
        animationDuration: 1000
      });
      aInsta.show();
    }

    const btnFb = document.querySelector('#btn-fb');
    if (btnFb) {
      const aFb = annotate(btnFb, {
        type: 'box',
        color: '#0284c7',
        strokeWidth: 1.5,
        padding: 4,
        animationDuration: 1000
      });
      aFb.show();
    }

    setTimeout(applyChalkFilterToNotation, 50);
  }, 150);
});

// Globale functie voor de spiekbriefje pop-up
window.toggleStickyNote = function() {
  const sticky = document.getElementById('sticky-note');
  if (sticky) {
    sticky.classList.toggle('hidden');
  }
};
