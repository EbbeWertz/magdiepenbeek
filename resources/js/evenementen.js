import { annotate } from 'rough-notation';

const applyChalkFilterToNotation = () => {
    document.querySelectorAll('.rough-notation-holder svg').forEach(svg => {
        svg.classList.add('chalk-texture');
        svg.style.filter = 'url(#chalk-filter)';
    });
};

window.addEventListener('load', () => {
    setTimeout(() => {
        // Zoek alle event-titels op en geef ze een speelse onderlijning
        const eventTitles = document.querySelectorAll('[id^="event-title-"]');

        eventTitles.forEach((titleEl) => {
            annotate(titleEl, {
                type: 'underline',
                color: '#b91c1c', // Krijtrood
                strokeWidth: 2,
                padding: 2,
                iterations: 2,
                animationDuration: 1000
            }).show();
        });

        setTimeout(applyChalkFilterToNotation, 50);
    }, 150);
});
