import { annotate } from 'rough-notation';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('book-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const albumCards = document.querySelectorAll('.album-card');

    const modalTitle = document.getElementById('modal-album-title');
    const modalDate = document.getElementById('modal-album-date');
    const spreadCounter = document.getElementById('modal-spread-counter');

    const leftImg = document.getElementById('modal-left-img');
    const leftCaption = document.getElementById('modal-left-caption');
    const leftBox = document.getElementById('modal-left-photo-box');
    const leftPageNum = document.getElementById('modal-left-page-num');

    const rightImg = document.getElementById('modal-right-img');
    const rightCaption = document.getElementById('modal-right-caption');
    const rightBox = document.getElementById('modal-right-photo-box');
    const rightPageNum = document.getElementById('modal-right-page-num');

    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');

    let currentAlbum = null;
    let currentSpreadIndex = 0;

    function isMobile() {
        return window.innerWidth < 768;
    }

    let prevAnnotation = null;
    let nextAnnotation = null;

    function initButtonAnnotations() {
        if (prevBtn && !prevAnnotation) {
            prevAnnotation = annotate(prevBtn, {
                type: 'box',
                color: '#ef4444',
                strokeWidth: 2,
                padding: 4,
                iterations: 2
            });
        }
        if (nextBtn && !nextAnnotation) {
            nextAnnotation = annotate(nextBtn, {
                type: 'box',
                color: '#38bdf8',
                strokeWidth: 2,
                padding: 4,
                iterations: 2
            });
        }
    }

    function updateAnnotations() {
        if (prevAnnotation) {
            if (prevBtn.disabled) {
                prevAnnotation.hide();
            } else {
                prevAnnotation.show();
            }
        }
        if (nextAnnotation) {
            if (nextBtn.disabled) {
                nextAnnotation.hide();
            } else {
                nextAnnotation.show();
            }
        }
    }

    albumCards.forEach(card => {
        card.addEventListener('click', () => {
            const dataScript = card.querySelector('.album-data');
            if (!dataScript) return;

            currentAlbum = JSON.parse(dataScript.textContent);
            currentSpreadIndex = 0;

            modalTitle.textContent = currentAlbum.title;
            if (modalDate) modalDate.textContent = currentAlbum.datum || '';

            renderSpread();
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                initButtonAnnotations();
                updateAnnotations();
            }, 50);
        });
    });

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function renderSpread() {
        if (!currentAlbum || !currentAlbum.fotos) return;

        const totalFotos = currentAlbum.fotos.length;
        const mobile = isMobile();

        if (mobile) {
            const photoIndex = currentSpreadIndex;

            if (photoIndex < totalFotos) {
                const item = currentAlbum.fotos[photoIndex];
                leftImg.src = item.url;
                leftCaption.textContent = item.caption || '';
                leftPageNum.textContent = `Pagina ${photoIndex + 1}`;
                leftBox.style.visibility = 'visible';
            } else {
                leftBox.style.visibility = 'hidden';
                leftPageNum.textContent = '';
            }

            spreadCounter.textContent = `${currentSpreadIndex + 1} / ${totalFotos}`;
            prevBtn.disabled = (currentSpreadIndex === 0);
            nextBtn.disabled = (currentSpreadIndex >= totalFotos - 1);

        } else {
            const leftPhotoIndex = currentSpreadIndex * 2;
            const rightPhotoIndex = leftPhotoIndex + 1;

            if (leftPhotoIndex < totalFotos) {
                const item = currentAlbum.fotos[leftPhotoIndex];
                leftImg.src = item.url;
                leftCaption.textContent = item.caption || '';
                leftPageNum.textContent = `Pagina ${leftPhotoIndex + 1}`;
                leftBox.style.visibility = 'visible';
            } else {
                leftBox.style.visibility = 'hidden';
                leftPageNum.textContent = '';
            }

            if (rightPhotoIndex < totalFotos) {
                const item = currentAlbum.fotos[rightPhotoIndex];
                rightImg.src = item.url;
                rightCaption.textContent = item.caption || '';
                rightPageNum.textContent = `Pagina ${rightPhotoIndex + 1}`;
                rightBox.style.visibility = 'visible';
            } else {
                rightBox.style.visibility = 'hidden';
                rightPageNum.textContent = '';
            }

            const totalSpreads = Math.ceil(totalFotos / 2);
            spreadCounter.textContent = `${currentSpreadIndex + 1} / ${totalSpreads}`;

            prevBtn.disabled = (currentSpreadIndex === 0);
            nextBtn.disabled = (currentSpreadIndex >= totalSpreads - 1);
        }

        updateAnnotations();
    }

    window.addEventListener('resize', () => {
        if (!modal.classList.contains('hidden') && currentAlbum) {
            currentSpreadIndex = 0;
            renderSpread();
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSpreadIndex > 0) {
                currentSpreadIndex--;
                renderSpread();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const mobile = isMobile();
            const maxIndex = mobile
                ? currentAlbum.fotos.length - 1
                : Math.ceil(currentAlbum.fotos.length / 2) - 1;

            if (currentSpreadIndex < maxIndex) {
                currentSpreadIndex++;
                renderSpread();
            }
        });
    }
});
