import { annotate, annotationGroup } from 'rough-notation';

document.addEventListener('DOMContentLoaded', () => {
    // Bestaande annotaties...
    const eUcll = document.querySelector('#rn-ucll');
    const aUcll = eUcll ? annotate(eUcll, { type: 'highlight', color: '#fef08a', multiline: true }) : null;

    const eMotto = document.querySelector('#rn-motto');
    const aMotto = eMotto ? annotate(eMotto, { type: 'box', color: '#f87171', strokeWidth: 2, padding: 8 }) : null;

    // --- NIEUWE ROUGHNOTATIONS VOOR DE SYMBOLIEK SECTIE ---

    // 1. Highlight bij "keurig binnen de lijntjes"
    const eLijntjes = document.querySelector('#rn-lijntjes');
    const aLijntjes = eLijntjes ? annotate(eLijntjes, {
        type: 'highlight',
        color: '#fef08a'
    }) : null;

    // 3. Highlight onder de Latijnse spreuk
    const eSpreuk = document.querySelector('#rn-spreuk');
    const aSpreuk = eSpreuk ? annotate(eSpreuk, {
        type: 'highlight',
        color: '#fef08a',
        multiline: true
    }) : null;

    // 5. Onderlijning van de leuze op het papier
    const eLeuze = document.querySelector('#rn-leuze');
    const aLeuze = eLeuze ? annotate(eLeuze, {
        type: 'underline',
        color: '#991b1b',
        strokeWidth: 2
    }) : null;

    // Overige bestaande annotaties...
    const eRefrein = document.querySelector('#rn-refrein');
    const aRefrein = eRefrein ? annotate(eRefrein, { type: 'circle', color: '#991b1b', padding: 4 }) : null;

    const eDies = document.querySelector('#rn-dies');
    const aDies = eDies ? annotate(eDies, { type: 'highlight', color: '#fbcfe8' }) : null;

    const eIedereen = document.querySelector('#rn-iedereen');
    const aIedereen = eIedereen ? annotate(eIedereen, { type: 'double-underline', color: '#38bdf8' }) : null;

    // Voeg alle annotaties samen in de animatiegroep
    const annotations = [
        aUcll, aMotto, aLijntjes, aVcf, aSpreuk, aLo, aLeuze, aRefrein, aDies, aIedereen
    ].filter(Boolean);

    if (annotations.length > 0) {
        const group = annotationGroup(annotations);
        setTimeout(() => {
            group.show();
        }, 400);
    }
});
