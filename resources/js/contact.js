import { annotate, annotationGroup } from 'rough-notation';

let activeAnnotations = [];

const applyChalkFilterToNotation = () => {
    document.querySelectorAll('.rough-notation-holder svg').forEach(svg => {
        svg.classList.add('chalk-texture');
        svg.style.filter = 'url(#chalk-filter)';
    });
};

const setupContactAnnotations = () => {
    // Wis bestaande annotaties bij resize/herladen
    if (activeAnnotations.length > 0) {
        activeAnnotations.forEach(a => a.hide());
        activeAnnotations = [];
    }

    const isMobile = window.innerWidth < 640;

    // 1. Onderlijning E-mail item
    const emailItem = document.querySelector('#contact-email-item');
    if (emailItem) {
        activeAnnotations.push(annotate(emailItem, {
            type: 'underline',
            color: '#b91c1c',
            strokeWidth: isMobile ? 1.5 : 2,
            padding: isMobile ? 2 : 4,
            iterations: 2
        }));
    }

    // 2. Onderlijning Adres item
    const adresItem = document.querySelector('#contact-adres-item');
    if (adresItem) {
        activeAnnotations.push(annotate(adresItem, {
            type: 'underline',
            color: '#b91c1c',
            strokeWidth: isMobile ? 1.5 : 2,
            padding: isMobile ? 2 : 4,
            iterations: 2
        }));
    }

    // 3. Omkadering voor de Lidmaatschap Knop
    const btnLid = document.querySelector('#lidmaatschap-btn');
    if (btnLid) {
        activeAnnotations.push(annotate(btnLid, {
            type: 'box',
            color: '#b91c1c',
            strokeWidth: isMobile ? 1.5 : 2,
            padding: isMobile ? 4 : 6,
            iterations: 2
        }));
    }

    if (activeAnnotations.length > 0) {
        const group = annotationGroup(activeAnnotations);
        group.show();
        setTimeout(applyChalkFilterToNotation, 50);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupContactAnnotations, 200);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setupContactAnnotations, 200);
});
