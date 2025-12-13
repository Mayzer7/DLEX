// header scroll animation
const header = document.querySelector('.header');

if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 0) {
        header.classList.remove('header--hidden', 'header--scrolled');
        lastScrollY = currentScrollY;
        ticking = false;
        return;
        }

        // scroll down
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
        header.classList.add('header--hidden');
        header.classList.remove('header--scrolled');
        }

        // scroll up
        if (currentScrollY < lastScrollY) {
        header.classList.remove('header--hidden');
        header.classList.add('header--scrolled');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    });

    ticking = true;
    });
}


// Video
const video = document.querySelector('.main-video');

if (video) {
    const playBtn = document.querySelector('.video-play');

    const toggleVideo = () => {
        if (video.paused) {
        video.muted = false;
        video.play();
        playBtn.classList.add('is-hidden');
        } else {
        video.pause();
        playBtn.classList.remove('is-hidden');
        }
    };

    playBtn.addEventListener('click', toggleVideo);
    video.addEventListener('click', toggleVideo);
}

