import { annotate, annotationGroup } from 'rough-notation';

let group = null;
let annotations = [];

const applyChalkFilterToNotation = () => {
    document.querySelectorAll('.rough-notation-holder svg').forEach(svg => {
        svg.classList.add('chalk-texture');
    });
};

const setupAboutAnnotations = () => {
    if (annotations.length > 0) {
        annotations.forEach(a => a.hide());
        annotations = [];
    }

    const isMobile = window.innerWidth < 640;

    // Helper functie om veilig annotaties toe te voegen
    const add = (selector, config) => {
        const el = document.querySelector(selector);
        if (el) annotations.push(annotate(el, config));
    };

    add('#rn-ucll', {
        type: 'highlight',
        color: '#fef08a',
        multiline: true
    });

    add('#rn-motto', {
        type: 'box',
        color: '#f87171',
        strokeWidth: isMobile ? 1.5 : 2,
        padding: isMobile ? 4 : 8
    });

    add('#rn-lijntjes', {
        type: 'highlight',
        color: '#fef08a'
    });

    add('#rn-spreuk', {
        type: 'highlight',
        color: '#fef08a',
        multiline: true
    });

    add('#rn-leuze', {
        type: 'underline',
        color: '#991b1b',
        strokeWidth: isMobile ? 1.5 : 2
    });

    add('#rn-refrein', {
        type: 'circle',
        color: '#991b1b',
        padding: isMobile ? 2 : 4
    });

    add('#rn-dies', {
        type: 'highlight',
        color: '#fbcfe8'
    });

    add('#rn-iedereen', {
        type: 'double-underline',
        color: '#38bdf8'
    });

    if (annotations.length > 0) {
        group = annotationGroup(annotations);
        group.show();
        setTimeout(applyChalkFilterToNotation, 50);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupAboutAnnotations, 200);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setupAboutAnnotations, 200);
});
