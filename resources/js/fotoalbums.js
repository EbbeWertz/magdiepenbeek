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
    const rightPageContainer = document.getElementById('modal-right-page-container');

    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');

    let currentAlbum = null;
    let currentIndex = 0; // ALWAYS tracks the active PHOTO index (0-based)

    // Accurate match for CSS Tailwind 'md' breakpoint (< 768px)
    function isMobile() {
        return window.matchMedia('(max-width: 767px)').matches;
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
            prevBtn.disabled ? prevAnnotation.hide() : prevAnnotation.show();
        }
        if (nextAnnotation) {
            nextBtn.disabled ? nextAnnotation.hide() : nextAnnotation.show();
        }
    }

    albumCards.forEach(card => {
        card.addEventListener('click', () => {
            const dataScript = card.querySelector('.album-data');
            if (!dataScript) return;

            currentAlbum = JSON.parse(dataScript.textContent);
            currentIndex = 0; 

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

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function renderSpread() {
        if (!currentAlbum || !currentAlbum.fotos || currentAlbum.fotos.length === 0) return;

        const totalFotos = currentAlbum.fotos.length;
        const mobile = isMobile();

        if (mobile) {
            // MOBILE: Clear and disable the right container completely
            if (rightPageContainer) rightPageContainer.style.display = 'none';
            if (rightImg) rightImg.src = '';
            if (rightCaption) rightCaption.textContent = '';

            const photoIndex = currentIndex;

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

            spreadCounter.textContent = `${photoIndex + 1} / ${totalFotos}`;
            prevBtn.disabled = (photoIndex <= 0);
            nextBtn.disabled = (photoIndex >= totalFotos - 1);

        } else {
            // DESKTOP: Reset display for right page container
            if (rightPageContainer) rightPageContainer.style.display = '';

            const spreadIndex = Math.floor(currentIndex / 2);
            const leftPhotoIndex = spreadIndex * 2;
            const rightPhotoIndex = leftPhotoIndex + 1;
            const totalSpreads = Math.ceil(totalFotos / 2);

            // Left Page
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

            // Right Page
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

            spreadCounter.textContent = `${spreadIndex + 1} / ${totalSpreads}`;
            prevBtn.disabled = (spreadIndex <= 0);
            nextBtn.disabled = (spreadIndex >= totalSpreads - 1);
        }

        updateAnnotations();
    }

    window.addEventListener('resize', () => {
        if (!modal.classList.contains('hidden') && currentAlbum) {
            renderSpread();
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!currentAlbum || !currentAlbum.fotos) return;

            const mobile = isMobile();

            if (mobile) {
                if (currentIndex > 0) {
                    currentIndex--;
                    renderSpread();
                }
            } else {
                const spreadIndex = Math.floor(currentIndex / 2);
                if (spreadIndex > 0) {
                    currentIndex = (spreadIndex - 1) * 2;
                    renderSpread();
                }
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!currentAlbum || !currentAlbum.fotos) return;

            const totalFotos = currentAlbum.fotos.length;
            const mobile = isMobile();

            if (mobile) {
                if (currentIndex < totalFotos - 1) {
                    currentIndex++;
                    renderSpread();
                }
            } else {
                const spreadIndex = Math.floor(currentIndex / 2);
                const totalSpreads = Math.ceil(totalFotos / 2);

                if (spreadIndex < totalSpreads - 1) {
                    currentIndex = (spreadIndex + 1) * 2;
                    renderSpread();
                }
            }
        });
    }
});