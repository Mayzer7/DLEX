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





// Swiper

const whyDlexCards = document.querySelector('.why-dlex-cards');

if (whyDlexCards) {
    const paginationContainer = document.querySelector('.pagination-dots');
    const prevBtn = document.querySelector('.pagination-arrow--prev');
    const nextBtn = document.querySelector('.pagination-arrow--next');

    function renderPagination(swiper) {
        paginationContainer.innerHTML = '';

        swiper.snapGrid.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'pagination-dot';

            if (index === swiper.snapIndex) {
            dot.classList.add('pagination-dot--active');
            }

            dot.addEventListener('click', () => {
            swiper.slideTo(index);
            });

            paginationContainer.appendChild(dot);
        });
    }

    function updatePagination(swiper) {
        const dots = paginationContainer.querySelectorAll('.pagination-dot');

        dots.forEach((dot, index) => {
            dot.classList.toggle(
            'pagination-dot--active',
            index === swiper.snapIndex
            );
        });
    }

    function updateArrows(swiper) {
        prevBtn.classList.toggle('disabled', swiper.isBeginning);
        nextBtn.classList.toggle('disabled', swiper.isEnd);
    }

    const whyDlexSwiper = new Swiper(whyDlexCards, {
        slidesPerView: 4,
        spaceBetween: 24,
        speed: 600,

        navigation: {
            nextEl: '.pagination-arrow--next',
            prevEl: '.pagination-arrow--prev',
        },

        on: {
            init(swiper) {
            renderPagination(swiper);
            updatePagination(swiper);
            updateArrows(swiper);
            },

            slideChange(swiper) {
            updatePagination(swiper);
            updateArrows(swiper);
            },

            resize(swiper) {
            renderPagination(swiper);
            updatePagination(swiper);
            updateArrows(swiper);
            }
        },

        breakpoints: {
            0: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
        }
    });
}

