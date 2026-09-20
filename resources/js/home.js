import { annotate, annotationGroup } from 'rough-notation';

let ag = null;
let annotations = [];

const applyChalkFilterToNotation = () => {
  document.querySelectorAll('.rough-notation-holder svg').forEach(svg => {
    svg.classList.add('chalk-texture');
  });
};

const setupAnnotations = () => {
  // Als er al annotaties bestaan (bij resize), maak ze eerst leeg
  if (annotations.length > 0) {
    annotations.forEach(a => a.hide());
    annotations = [];
  }

  // Bepaal of het scherm mobiel is voor kleinere padding
  const isMobile = window.innerWidth < 640;
  const boxPadding = isMobile ? 2 : 6;
  const smallBoxPadding = isMobile ? 2 : 4;

  // 1. Motto (Double Chalk Underline)
  const leuze = document.querySelector('#leuze-text');
  if (leuze) {
    annotations.push(annotate(leuze, {
      type: 'underline',
      color: '#fef08a',
      strokeWidth: isMobile ? 1.5 : 2,
      iterations: 2,
      animationDuration: 1200
    }));
  }

  // 2. Hero knoppen
  const btnLid = document.querySelector('#btn-lid');
  if (btnLid) {
    annotations.push(annotate(btnLid, {
      type: 'box',
      color: '#fef08a',
      strokeWidth: isMobile ? 1.5 : 2,
      padding: boxPadding,
      animationDuration: 1200
    }));
  }

  const btnEvents = document.querySelector('#btn-events');
  if (btnEvents) {
    annotations.push(annotate(btnEvents, {
      type: 'rectangle',
      color: '#ffffff',
      strokeWidth: 1.5,
      padding: boxPadding,
      animationDuration: 1400
    }));
  }

  // 3. Content Section links
  const btnOverOns = document.querySelector('#btn-over-ons');
  if (btnOverOns) {
    annotations.push(annotate(btnOverOns, {
      type: 'underline',
      color: '#991b1b',
      strokeWidth: 1.5,
      animationDuration: 1000
    }));
  }

  const btnAgenda = document.querySelector('#btn-agenda');
  if (btnAgenda) {
    annotations.push(annotate(btnAgenda, {
      type: 'underline',
      color: '#075985',
      strokeWidth: 1.5,
      animationDuration: 1000
    }));
  }

  // 4. Social Knoppen
  const btnInsta = document.querySelector('#btn-insta');
  if (btnInsta) {
    annotations.push(annotate(btnInsta, {
      type: 'box',
      color: '#db2777',
      strokeWidth: 1.5,
      padding: smallBoxPadding,
      animationDuration: 1000
    }));
  }

  const btnFb = document.querySelector('#btn-fb');
  if (btnFb) {
    annotations.push(annotate(btnFb, {
      type: 'box',
      color: '#0284c7',
      strokeWidth: 1.5,
      padding: smallBoxPadding,
      animationDuration: 1000
    }));
  }

  // Toon alle annotaties via een group voor betere performance
  ag = annotationGroup(annotations);
  ag.show();

  setTimeout(applyChalkFilterToNotation, 50);
};

window.addEventListener('load', () => {
  setTimeout(() => {
    const ctaContainer = document.querySelector('#cta-container');
    if (ctaContainer) ctaContainer.classList.remove('opacity-0');

    setupAnnotations();
  }, 150);
});

// Resize handler met debounce tegen lag tijdens het schalen/roteren van mobiel
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setupAnnotations();
  }, 200);
});

// Globale functie voor de spiekbriefje pop-up
window.toggleStickyNote = function() {
  const sticky = document.getElementById('sticky-note');
  if (sticky) {
    sticky.classList.toggle('hidden');
  }
};
