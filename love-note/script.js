document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const envelope = document.getElementById('envelope');
    const hint = document.getElementById('hint');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const navControls = document.getElementById('navControls');
    const pageIndicator = document.getElementById('pageIndicator');
    const letters = Array.from(document.querySelectorAll('.letter'));
    const totalLetters = letters.length;

    let isOpen = false;
    let currentIndex = 0;

    // Randomize floating nickname text motion
    randomizeFloatingTexts();

    // Initialize first letter as active
    letters[currentIndex].classList.add('active');
    updatePageIndicator();

    // Reveal the envelope shortly after load
    setTimeout(() => {
        envelope.classList.add('show');
    }, 300);

    function randomizeFloatingTexts() {
        const texts = document.querySelectorAll('.floating-text');
        const directions = ['bottom', 'top', 'left', 'right'];

        texts.forEach((text, index) => {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const delay = index * 2.2 + Math.random() * 2.5; // staggered, only 2-3 visible at a time
            const duration = 16 + Math.random() * 10; // 16s to 26s
            const size = 0.85 + Math.random() * 0.45; // 0.85rem to 1.3rem
            const rotateStart = -12 + Math.random() * 24; // -12deg to 12deg
            const rotateEnd = -12 + Math.random() * 24; // -12deg to 12deg

            text.setAttribute('data-direction', direction);
            text.style.setProperty('--ft-delay', `${delay}s`);
            text.style.setProperty('--ft-duration', `${duration}s`);
            text.style.setProperty('--ft-size', `${size}rem`);
            text.style.setProperty('--ft-rotate-start', `${rotateStart}deg`);
            text.style.setProperty('--ft-rotate-end', `${rotateEnd}deg`);

            if (direction === 'bottom') {
                text.style.setProperty('--ft-left', `${Math.random() * 90 + 5}%`);
                text.style.setProperty('--ft-translate-x', `${-30 + Math.random() * 60}px`);
                text.style.setProperty('--ft-translate-y', `${-110 - Math.random() * 40}vh`);
            } else if (direction === 'top') {
                text.style.setProperty('--ft-left', `${Math.random() * 90 + 5}%`);
                text.style.setProperty('--ft-translate-x', `${-30 + Math.random() * 60}px`);
                text.style.setProperty('--ft-translate-y', `${110 + Math.random() * 40}vh`);
            } else if (direction === 'left') {
                text.style.setProperty('--ft-top', `${Math.random() * 90 + 5}%`);
                text.style.setProperty('--ft-translate-x', `${110 + Math.random() * 40}vw`);
                text.style.setProperty('--ft-translate-y', `${-30 + Math.random() * 60}px`);
            } else if (direction === 'right') {
                text.style.setProperty('--ft-top', `${Math.random() * 90 + 5}%`);
                text.style.setProperty('--ft-translate-x', `${-110 - Math.random() * 40}vw`);
                text.style.setProperty('--ft-translate-y', `${-30 + Math.random() * 60}px`);
            }
        });
    }

    openBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        // Toggle the envelope open/closed
        envelope.classList.toggle('open', isOpen);
        openBtn.classList.toggle('is-open', isOpen);

        if (isOpen) {
            hint.textContent = 'Click the heart to close';
            openBtn.querySelector('.heart-text').textContent = 'Close';
            openBtn.style.opacity = '0.95';
            navControls.classList.add('visible');
            navControls.setAttribute('aria-hidden', 'false');
        } else {
            hint.textContent = 'Click the heart to open your surprise';
            openBtn.querySelector('.heart-text').textContent = 'Open';
            openBtn.style.opacity = '1';
            navControls.classList.remove('visible');
            navControls.setAttribute('aria-hidden', 'true');
        }
    });

    prevBtn.addEventListener('click', () => {
        if (!isOpen || currentIndex <= 0) return;
        switchLetter(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (!isOpen || currentIndex >= totalLetters - 1) return;
        switchLetter(currentIndex + 1);
    });

    function switchLetter(newIndex) {
        letters[currentIndex].classList.remove('active');
        currentIndex = newIndex;
        letters[currentIndex].classList.add('active');
        updatePageIndicator();
        updateNavButtons();
    }

    function updatePageIndicator() {
        pageIndicator.textContent = `${currentIndex + 1} / ${totalLetters}`;
    }

    function updateNavButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalLetters - 1;
    }

    updateNavButtons();
});
