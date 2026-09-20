import { annotate } from 'rough-notation';

const applyChalkFilterToNotation = () => {
    document.querySelectorAll('.rough-notation-holder svg').forEach(svg => {
        svg.classList.add('chalk-texture');
        svg.style.filter = 'url(#chalk-filter)';
    });
};

window.addEventListener('load', () => {
    setTimeout(() => {
        // Onderlijning E-mail icoon + tekst als 1 item
        const emailItem = document.querySelector('#contact-email-item');
        if (emailItem) {
            annotate(emailItem, {
                type: 'underline',
                color: '#b91c1c',
                strokeWidth: 2,
                padding: 4,
                iterations: 2,
                animationDuration: 1000
            }).show();
        }

        // Onderlijning Adres icoon + tekst als 1 item
        const adresItem = document.querySelector('#contact-adres-item');
        if (adresItem) {
            annotate(adresItem, {
                type: 'underline',
                color: '#b91c1c',
                strokeWidth: 2,
                padding: 4,
                iterations: 2,
                animationDuration: 1000
            }).show();
        }

        // Rechthoek omkadering voor de transparante Lidmaatschap Knop
        const btnLid = document.querySelector('#lidmaatschap-btn');
        if (btnLid) {
            annotate(btnLid, {
                type: 'box',
                color: '#b91c1c',
                strokeWidth: 2,
                padding: 6,
                iterations: 2,
                animationDuration: 1200
            }).show();
        }

        setTimeout(applyChalkFilterToNotation, 50);
    }, 150);
});
